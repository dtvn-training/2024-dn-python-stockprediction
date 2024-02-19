import subprocess

# Danh sách các gói cần thiết, thay thế bằng các gói bạn muốn cài đặt
required_packages = ["mysql-connector-python","uuid","json","pandas","ast"]

def install_packages(packages):
    for package in packages:
        subprocess.call(["pip", "install", package])


install_packages(required_packages)
