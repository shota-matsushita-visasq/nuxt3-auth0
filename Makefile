include .env

.PHONY: local
local:
	npm run dev

.PHONY: deploy
deploy:
	gcloud builds submit \
	  --region=asia-northeast1 \
	  --substitutions=_GCP_PROJECT_ID=${GCP_PROJECT_ID},_AUTH0_DOMAIN=${AUTH0_DOMAIN},_AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID},_AUTH0_AUDIENCE=${AUTH0_AUDIENCE},_AUTH0_CUSTOM_CLAIM_NAMESPACE=${AUTH0_CUSTOM_CLAIM_NAMESPACE}
