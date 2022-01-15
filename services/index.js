import { request, gql } from 'graphql-request';
import { next_public_graphcms_endpoint } from '../configs/config';

export const getPosts = async () => {
	const query = gql`
		query MyQuery {
			postsConnection {
				edges {
					node {
						author {
							bio
							id
							name
						}
						slug
						title
						createdAt
						excerpt
						featuredImage {
							url
						}
						categories {
							name
							slug
						}
					}
				}
			}
		}`

	// TODO
	/* need to figure out why I got error from GraphCMS */	
	// const results = await request(next_public_graphcms_endpoint, query);

	return [];
}