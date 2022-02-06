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
							photo {
                url
              }
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
		}
	`;

	const response = await request(next_public_graphcms_endpoint, query);

	return response?.postsConnection?.edges;
};

export const getRecentPosts = async () => {
	const query = gql`
		query getRecentPosts() {
			posts(
				orderBy: createdAt_ASC
				last: 3
			) {
				title
				featuredImage {
					url
				}
				createdAt
				slug
			}
		}
	`;

	const response = await request(next_public_graphcms_endpoint, query);

	return response?.posts;
};

export const getSimilarPosts = async (categories, slug) => {
	const query = gql`
		query GetPostDetails($slug: String!, $categories: [String!]) {
			posts(
				where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }
				last: 3
			) {
        title
        featuredImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const response = await request(next_public_graphcms_endpoint, query, { categories, slug });

  return response?.posts;
};

export const getCategories = async () => {
	const query = gql`
    query GetGategories {
        categories {
          name
          slug
        }
    }
  `;

	const response = await request(next_public_graphcms_endpoint, query);

  return response?.categories;
};