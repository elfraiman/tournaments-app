import styles from "../styles/Home.module.css";
import { gql, GraphQLClient } from "graphql-request";

export const getStaticProps = async () => {
  const url =
    "https://api-eu-central-1.graphcms.com/v2/ckuzsed980c8701xlhkyw6h22/master";

  const graphQLClient = new GraphQLClient(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2MzQ3NTU4NTIsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NrdXpzZWQ5ODBjODcwMXhsaGt5dzZoMjIvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiOTU4OGU5OWQtODZmNS00YTdkLTk1MzktODFiMzM1NTg5ZTNiIiwianRpIjoiY2t1enZmY3M5MGY1cDAxeXoyZGR1OHJ1eSJ9.OJL9IFh_C5QiHa3iosiU7t0ZmE93SgvxidHGKpmGt-u6C1wTIrvSfrCfBrbO7J6rQlO2kYF1zuBVs-iQJIfJVPUwur-hVbjhnDlvnUDDUsrSWOu8i7P_PHc6xGDKcS6IyZQJUEXZOPYlO7n959FuHOQfkjMA46zUDsJrmQfRdif1rlvOqfMh58YC4hwtFVv6pZ3yXh8GCPKErLmgWZD92AWnIZNBEw53DceW-OV3kU9L2R063RC-ku1VuM9-SyD9cGymYeRndGu1qB8lmsv7_szBxt6KpbiD8THEkIg7Xo4trVLd7MpvXB35SEftSsh5iZ3GXExf69QXN6RnXe86sFapz3q-L68wBJr_Wx_w5s-xq9MFKOve189crzjfterCHIgjG0nm7bo9AZQk7hTYtqqBvH7PIUc8SAox7XHMDo9fAX10H6zBf2kjr4gkDDtCKE3Tff3mcVnZ9W5pEUF5_0QW7C_u9HTDuwBHyuTmzDkJQR51Bm1rOiVoyF1H_bNnM8sAtNYkQqrD32QQbKr9maYdia18nog-ZibhT5ET2vjnsc_1ZT-UCCKd9r8SvLCDn8f60-8tzsq3tEDtbekE8hHa0l5l6AYthZPbqYtfC7DVAWUHTwGWrKGChBEVBocKXpy4j2zA-f9kj4_30qnTl08U2_CqO82ETYEZo4QqU4o",
    },
  });

  const query = gql`
  query {
    matches {
      id
      title
      startDate
      tags
      slug
      thumbnail {
        id
      }
    }
  }
`;


  const data = await graphQLClient.request(query);

  console.log(data);

  return {props: data}
};


function Home(props) {

  console.log(props);
  return <div className={styles.container}>Container</div>;
}

export default Home;
