import os

from dotenv import load_dotenv

load_dotenv()

try:
    from supabase import create_client
except ImportError as exc:
    raise RuntimeError(
        "The 'supabase' package is not installed. Run: python -m pip install -r requirements.txt"
    ) from exc

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not url or not key:
    raise RuntimeError(
        "Missing SUPABASE_URL or SUPABASE_KEY in your environment/.env file."
    )

supabase = create_client(url, key)

email = input("Email: ")
password = input("Password: ")

response = supabase.auth.sign_in_with_password({
    "email": email,
    "password": password,
})

session = response.session

if session is None:
    print("LOGIN FAILED")
else:
    print("\nLOGIN SUCCESS")
    print("User ID:", session.user.id)
    print("Email:", session.user.email)
    print("\nACCESS TOKEN:")
    print(session.access_token)