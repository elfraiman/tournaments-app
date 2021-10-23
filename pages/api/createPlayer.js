/* eslint-disable import/no-anonymous-default-export */
import { GraphQLClient } from "graphql-request";

export default async ({ body }, response) => {
  const graphCMS = new GraphQLClient(process.env.ENDPOINT, {
    headers: { Authorization: process.env.GRAPH_CMS_TOKEN },
  });

  await graphCMS.request(
    `
        mutation($name: String!, $email: String!, $picture: String!) {
            __typename
            createPlayer(data: {name: $name, email: $email, picture: $picture}) {
              id
            }
          }
          `,
    { name: body.name, email: body.email, picture: body.picture }
  );

  response.status(201).json({ slug: body.slug });
};
