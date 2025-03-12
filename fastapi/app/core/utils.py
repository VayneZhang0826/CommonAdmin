import random
import string

def stringGen(length: int = 24):
    _str = ""
    for i in range(length):
        _str += "".join(random.choice(string.ascii_letters + string.digits))
    return _str