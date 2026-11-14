# NVIDIA NIM integration

`POST /api/analyze` sends an OpenAI-compatible chat request to NVIDIA NIM.

The default model is `nvidia/nemotron-3.5-super-vl-120b-a12b`, which accepts text and image input. Keep the model key in `.env`, never in `public/` files or commits.

When the key is not configured, the server returns a clearly labelled demonstration routine.
