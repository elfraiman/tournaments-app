/* eslint-disable import/no-anonymous-default-export */
import { GraphQLClient } from "graphql-request";

export default async ({ body }, response) => {
  const graphCMS = new GraphQLClient(process.env.ENDPOINT, {
    headers: { Authorization: process.env.GRAPH_CMS_TOKEN },
  });

  await graphCMS.request(
    `
    mutation unregisterPlayer($email: String!, $tournamentId: ID!) {
        __typename
        updatePlayer(
          data: {tournament: {disconnect: {id: $tournamentId}}}
          where: {email: $email}
        ) {
          id
        }
        updateTournament(
          data: {players: {disconnect: {email: $email}}}
          where: {id: $tournamentId}
        ) {
          id
        }
        publishTournament(where: {id: $tournamentId}, to: PUBLISHED) {
          id
        }
        publishPlayer(where: {email: $email}, to: PUBLISHED) {
          id
        }
      }
        `,
    { email: body.email, tournamentId: body.tournamentId }
  );

  response.status(201).json({ id: body.id });
};
