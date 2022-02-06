import React from 'react';
import moment from 'moment';
import Image from 'next/image';

import { grpahCMSImageLoader } from '../util';

const PostDetail = ({ post }) => {
	const getContentFragment = (idx, text, obj, type) => {
    let modifiedText = text;

    if (obj) {
      if (obj.bold) {
        modifiedText = (<b key={idx}>{text}</b>);
      }

      if (obj.italic) {
        modifiedText = (<em key={idx}>{text}</em>);
      }

      if (obj.underline) {
        modifiedText = (<u key={idx}>{text}</u>);
      }
    }

    switch (type) {
      case 'heading-three':
        return <h3 key={idx} className="text-xl font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h3>;
      case 'paragraph':
        return <p key={idx} className="mb-8">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</p>;
      case 'heading-four':
        return <h4 key={idx} className="text-md font-semibold mb-4">{modifiedText.map((item, i) => <React.Fragment key={i}>{item}</React.Fragment>)}</h4>;
      case 'image':
        return (
					<div className="block overflow-hidden shadow-md mb-6">
						<Image
							key={idx}
							alt={obj.title}
							height={obj.height}
							width={obj.width}
							src={obj.src}
							priority="false"
							layout='responsive'
						/>
					</div>
        );
      default:
        return modifiedText;
    }
  };
	return (
		<div className="bg-white shadow-lg rounded-lg lg:p-8 pb-12">
			<div className="block overflow-hidden shadow-md mb-6">
				{post?.featuredImage?.url && (<Image
					unoptimized
					loader={grpahCMSImageLoader}
					src={post?.featuredImage?.url}
					alt={post?.title}
					priority="false"
					layout='responsive'
					width={500}
					height={200}
					className="object-top object-cover rounded-t-lg lg:rounded-lg"
				/>)}
			</div>
			<div className="px-4 lg:px-0">
				<div className="flex items-center mb-8 w-full">
					<div className="flex items-center mb-4 lg:mb-0 w-full lg:w-auto mr-8">
						{post?.author?.photo?.url && (<Image
							unoptimized
							loader={grpahCMSImageLoader}
							src={post?.author?.photo?.url}
							alt={post?.author?.name}
							priority="false"
							height="30px"
							width="30px"
							className="align-middle rounded-full"
						/>)}
						{post?.author?.name && (<p className="inline align-middle text-gray-700 ml-2 font-medium text-lg">{post?.author?.name}</p>)}
					</div>
					<div className="font-medium text-gray-700">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline mr-2 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
						</svg>
						{post?.createdAt && (<span className="align-middle">{moment(post?.createdAt).format('MMM DD, YYYY')}</span>)}
					</div>
				</div>
				{post?.title && (<h1 className="mb-8 text-3xl font-semibold">{post?.title}</h1>)}
				{post?.content?.raw?.children?.map((typeObj, index) => {
					const children = typeObj?.children?.map((item, idx) => getContentFragment(idx, item?.text, item));

					return getContentFragment(index, children, typeObj, typeObj?.type);
				})}
			</div>
		</div>
	)
};

export default PostDetail;