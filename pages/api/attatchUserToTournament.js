/* eslint-disable import/no-anonymous-default-export */
import { GraphQLClient } from "graphql-request";

export default async ({ body }, response) => {
  const graphCMS = new GraphQLClient(process.env.ENDPOINT, {
    headers: { Authorization: process.env.GRAPH_CMS_TOKEN },
  });

  await graphCMS.request(
    `
    mutation registerPlayerToTournament($email: String!, $tournamentId: ID!) {
        updateTournament(
          data: {players: {connect: {where: {email: $email}}}}
          where: {id: $tournamentId}
        ) {
          id
        }
      }
      
          `,
    { email: body.email, tournamentId: body.tournamentId }
  );

  await graphCMS.request(
    `
    mutation executePlayerPublish($email: String!) {
      __typename
      publishPlayer(where: {email: $email}) {
        id
      }
    }
    
  `,
    { email: body.email }
  );

  response.status(201).json({ id: body.id });
};
