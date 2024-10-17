import { Amplify } from "aws-amplify";
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const appsync = {
    aws_project_region: config.public.aws_appsync_region,
    aws_appsync_graphqlEndpoint: config.public.aws_appsync_graphqlEndpoint,
    aws_appsync_region: config.public.aws_appsync_region,
    aws_appsync_authenticationType: config.public.appsync_authenticationType,
    aws_appsync_apiKey: config.public.aws_appsync_apiKey,
  };
  Amplify.configure(appsync, { ssr: true });
});
