from load_from_registry import load_latest_model

print("Loading model from Comet registry...")
model = load_latest_model()

print("Model loaded successfully:")
print(model)
print("Model type:", type(model))