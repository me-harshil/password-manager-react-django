# Generated by Django 4.1.10 on 2023-10-05 05:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_api', '0004_remove_customuser_email_verification_token_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='otp',
            field=models.CharField(blank=True, max_length=6, null=True),
        ),
    ]
