import { GraphQLClient, gql } from 'graphql-request';
import { next_public_graphcms_endpoint, graphcms_token } from '../../configs/config';

export default async function comments(req, res) {
	const { name, email, comment, slug } = req.body;
	
	const graphQLClient = new GraphQLClient(next_public_graphcms_endpoint, {
		headers: {
			authorization: `Bearer ${graphcms_token}`
		}
	});

	const query = gql`
		mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
			createComment(data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }) { id }
		}
	`;

	const response = await graphQLClient.request(query, {
    name,
    email,
    comment,
    slug
  });

  return res.status(200).send(response);
};