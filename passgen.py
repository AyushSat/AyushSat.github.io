import hashlib
import sys
import base64

def generate_secure_password(root_key: str, descriptor: str) -> str:
    salt = descriptor.encode('utf-8')
    derived_key = hashlib.pbkdf2_hmac(
        'sha256',
        root_key.encode('utf-8'),
        salt,
        iterations=600000, 
        dklen=32
    )

    password_base64 = base64.urlsafe_b64encode(derived_key).decode('utf-8')

    return password_base64.rstrip('=')[:10]

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print(f"Usage: python {sys.argv[0]} <root_key> <descriptor>")
        sys.exit(1)

    root_key = sys.argv[1]
    descriptor = sys.argv[2]
    
    password = generate_secure_password(root_key, descriptor)
    print("Password is:", password)