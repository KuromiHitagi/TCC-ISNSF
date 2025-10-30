import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
const serviceAccount = {
  type: "service_account",
  project_id: "tecvagas-5173",
  private_key_id: "01a675652ca4a2c8984c48080224170136c2321b",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvHyxsQ7Vx8QLC\nrWVOOSM5xT7sW2GummOmzpOuxu9dP7ZaK5p5curlFX167wrtc3PGncBsI7VxdIYQ\nPIpFxVe19S3G6aLTJ7PIBbvGxFTfk3eTEUNExw+IBZuCLT2jRfvOOE1aAV0Owprf\ndOL3ZJY3RaWz3DOnPYGd2CfK+Izt1pBgbCG5JO9X1P15JqOzkMSKvGWazAKtovqA\nZF7yvs4FOHrqWAk9DLpPYEK99qkMH6rgfnipTHbrdI4Ur/o23byP+TVuBzEaH0nf\nW/qs086F0rFNzSrx6Nyi2ZuPVGZ3gg3cRisr/KYXoJVIBDea/QSNJEnc6Ykiv7Nl\nqU1N+DobAgMBAAECggEAERMjC7NWX7O2JzEs7YGYs6tNxVHrplCbYspFkAcJk7gA\nma4is7DGwmtj/raMBDb7lOQQvPqGWHeaEr80ZDUnpjAvtHNXUutOFjSo6GqANAR2\n5joKqwwVsZeKYBj1J5RNRwAqWppDbor++sa00pZWJzF9RJo11xqiJrfKuXmelBns\nQF6ImVbuio9HFm04c9KiwWIydWT3Yhe45C66t/Wt6NmVaXLD1TfTzVUwc4k0G19N\n7Hv6mZm1GlTd4s2WowKGAJ3jBb9pu4NeS/Vf/G+fyBZTluNDV6LqJgQNKrv5f4rH\n+hlCSTnQSIJpr4ignc3VG8iDkelArkrjvZmtNrzG8QKBgQDg72X2Bvaji7o9rL/V\nEI7z2oM3aDiuJ4yUklocgIgDE+j1PzPXli5SFUKkydLXqtiFW9HHkCu1f7eR9QsK\n7W7PQJ4H7nEX/cSWBo7DyS4hLnGc9zBYvdvgGmTiM/j8Jlc+/aarEXfsB3SU4SbG\n348vNXOUne97zYNZzCEnQaKQXQKBgQDHTp5zLDr17Gb2YCPeDyHsFyVlVw42CKWz\n5T3S9uKqoYa3yRni+DWfYwUbexWmaOnUMxxsSZdkjd9uEypyG3mfivlHeT0uEQM2\no18LY4roFawW7w6CcVYRups3hccYIMKqIxSgxnaQdxrY0nXpn7APct4qNjXNQEKZ\nMxM2nhUs1wKBgQDEFK0DXWqfguylWvQXHkoflTqRkE7osh1AXpwjAICQfkizkZb1\ntjtG3rWrxSwBSTNafYJPvwP7QgyaNcyciAHytVeNfnQj/9nhFnJZhgSqdDwiIvGI\nSmlj4F5VOg0wcZPYm3Ew6xdpL86XAfa1oqjE9Il+4najq7F3FBVKjVLTGQKBgBLf\nkQWbBKJRFpbyF7Npf27Z6kKkccYQH5DffnFBy8kYrqcstfTWSE2llNA7YZt2h93+\nUQy4E0wEW0oTKovPqj6/bEemZXK9Ta6Y3eE4NekwVDF/xcH4dYwMPbKOSoIwZ/6w\nf72RzZx0iuhJVb0f0A5GdF9O7t1W3nefbIxZf+vVAoGBAIdHmBCf2ZT8feXpwPGk\nj/64w12qxd3VngyB2yO79g817/iQ3clqVMZUe3mpSNUYDELQ6xSi+RF4inLUPqK1\niKBJ58ntwOiPWPYk3ZE9B0HnRNRdo2O85pseWqByvIRfGj5WuwQNVA5o7aU3/qXr\npxY6ELzB/P/0ZcGOj1kXYlHL\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@tecvagas-5173.iam.gserviceaccount.com",
  client_id: "106364278701124008065",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40tecvagas-5173.iam.gserviceaccount.com"
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "tecvagas-5173"
  });
}

export default admin;
