from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from .models import Passwords
from .serializers import PasswordSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from cryptography.fernet import Fernet

key = Fernet.generate_key()


class PasswordListView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Fetch all passwords for the logged-in user
        passwords = Passwords.objects.filter(user=request.user)
        serializer = PasswordSerializer(passwords, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        user = request.user
        serializer = PasswordSerializer(data=request.data)
        if serializer.is_valid():
            # f = Fernet(key)
            # serializer.validated_data['passwordOfWebsite'] = f.encrypt(serializer.validated_data['passwordOfWebsite'].encode())
            # print(serializer.validated_data['passwordOfWebsite'])
            serializer.save(user=request.user)
            return Response({"message": "Password added successfully."}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordDetailView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        return get_object_or_404(Passwords, pk=pk)

    def get(self, request, pk):
        # Fetch a specific password for the logged-in user
        password = self.get_object(pk)
        serializer = PasswordSerializer(password)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        # Edit a specific password for the logged-in user
        password = self.get_object(pk)
        serializer = PasswordSerializer(password, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        # Delete a specific password for the logged-in user
        password = self.get_object(pk)
        password.delete()
        return Response({"msg": "Password delete Succesfully"}, status=status.HTTP_200_OK)
