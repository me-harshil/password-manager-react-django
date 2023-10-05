from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer, LoginSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail, message
from django.conf import settings
import random
from .models import CustomUser


class RegistrationAPIView(APIView):
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():

            # Send an email to the user
            subject = 'Your email needs to be verified'
            otp = random.randint(100000, 999999)
            message = f"Hi, your OTP is {otp}"
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [request.data.get('email')]
            send_mail(subject, message, email_from, recipient_list)
            user = serializer.save()
            user.otp = otp

            # Create a JWT token for the user
            refresh = RefreshToken.for_user(user)

            user.save()
            return Response(
                {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'user_id': user.id,
                    'email': user.email,
                    'name': user.name,
                    'message': 'Email sent to verify email address'
                },
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(
                email=serializer.validated_data['email'],
                password=serializer.validated_data['password']
            )
            if user:
                if user.is_email_verified:  # Check if the user has verified email
                    refresh = RefreshToken.for_user(user)
                    return Response({'refresh': str(refresh),
                                    'access': str(refresh.access_token), 'email': user.email}, status=status.HTTP_200_OK)
                else:
                    user.delete()
                    return Response({'otpError': 'Email not verified. Sign-up again.'}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyEmailAPIView(APIView):
    def post(self, request):
        user = CustomUser.objects.get(email=request.data.get('email'))
        otp = request.data.get('otp')
        if user.otp == otp:
            user.is_email_verified = True
            user.save()
            return Response({'message': 'Email verified successfully', 'status': 'success'}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid OTP', 'status': 'failed'}, status=status.HTTP_400_BAD_REQUEST)
