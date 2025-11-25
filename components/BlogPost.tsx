import React from 'react';
import { View, BlogPost as BlogPostType } from '../types';
import Footer from './Footer';

interface BlogPostProps {
    post: BlogPostType | null;
    navigate: (view: View) => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ post, navigate }) => {
    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">Post not found</h2>
                    <button onClick={() => navigate(View.BLOG)} className="mt-4 text-indigo-600 hover:text-indigo-500">
                        Back to Blog
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white font-sans min-h-screen flex flex-col">
            <div className="flex-grow">
                {/* Hero Image */}
                <div className="relative h-96 w-full">
                    <img
                        className="w-full h-full object-cover"
                        src={post.imageUrl}
                        alt={post.title}
                    />
                    <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mb-4">
                                {post.category}
                            </span>
                            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                {post.title}
                            </h1>
                            <div className="mt-6 flex items-center justify-center text-gray-300">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                                            {post.author.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-white">
                                            {post.author}
                                        </p>
                                        <div className="flex space-x-1 text-sm text-gray-300">
                                            <time dateTime={post.date}>{post.date}</time>
                                            <span aria-hidden="true">&middot;</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative py-16 bg-white overflow-hidden">
                    <div className="relative px-4 sm:px-6 lg:px-8">
                        <div className="text-lg max-w-prose mx-auto">
                            <p className="mt-8 text-xl text-gray-500 leading-8">
                                {post.excerpt}
                            </p>
                        </div>
                        <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                            <h2>Why this matters</h2>
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                            </p>
                            <blockquote>
                                <p>
                                    "The best way to predict the future is to create it." - Peter Drucker
                                </p>
                            </blockquote>
                            <p>
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                            </p>
                            <h3>Key Takeaways</h3>
                            <ul>
                                <li>Understanding the core problem is 50% of the solution.</li>
                                <li>Data-driven decisions always outperform gut feelings in the long run.</li>
                                <li>Continuous improvement is better than delayed perfection.</li>
                            </ul>
                            <p>
                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
                            </p>
                        </div>

                        <div className="max-w-prose mx-auto mt-12 border-t border-gray-200 pt-8">
                            <button
                                onClick={() => navigate(View.BLOG)}
                                className="text-indigo-600 font-medium hover:text-indigo-500 flex items-center"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                                Back to all articles
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer navigate={navigate} />
        </div>
    );
};

export default BlogPost;
