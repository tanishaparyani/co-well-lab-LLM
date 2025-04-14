def is_valid_bullet_output(data):
    return isinstance(data, dict) and all(k.startswith("BP_") for k in data.keys())

def is_valid_rationale_output(data):
    return isinstance(data, dict) and all(k.startswith("R_") for k in data.keys())

def is_valid_string_output(data):
    return isinstance(data, str) and len(data.strip()) > 20  # or some reasonable minimum
