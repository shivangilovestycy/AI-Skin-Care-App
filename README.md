# Mira — skin intelligence

Mira is a cautious, image-assisted skincare education prototype. A user can add a selfie, enter their age range and preferences, then receive a general routine with product categories and verified brand links.

## Run locally

1. Copy `.env.example` to `.env`
2. Add `NVIDIA_API_KEY` to `.env`
3. Run `npm run dev`
4. Open `http://localhost:3000`

## Important boundary

Mira is not a dermatologist and does not diagnose from images. It routes high-risk or persistent concerns to professional care and uses age range supplied by the user rather than inferring age or gender from a photo.

## Product imagery

The UI does not generate product packshots. Exact images should only arrive from a verified brand or authorised retailer asset feed.
