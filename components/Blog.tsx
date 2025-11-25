import React from 'react';
import { View, BlogPost } from '../types';
import Footer from './Footer';

interface BlogProps {
  navigate: (view: View) => void;
  onPostClick: (post: BlogPost) => void;
}

export const posts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Software Estimation is AI',
    excerpt: 'Why traditional estimation methods are failing and how AI is revolutionizing the industry with data-driven insights.',
    author: 'Sarah Johnson',
    date: 'Mar 16, 2024',
    readTime: '6 min read',
    category: 'Industry Trends',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 2,
    title: 'How to Reduce Development Costs by 30%',
    excerpt: 'Practical tips and strategies for optimizing your development budget without compromising on quality or speed.',
    author: 'Michael Chen',
    date: 'Mar 10, 2024',
    readTime: '4 min read',
    category: 'Cost Optimization',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80'
  },
  {
    id: 3,
    title: 'Global Developer Salary Trends 2024',
    excerpt: 'A deep dive into the latest salary data from major tech hubs around the world. Where is the best value for talent?',
    author: 'Alex Rivera',
    date: 'Feb 28, 2024',
    readTime: '11 min read',
    category: 'Market Data',
    imageUrl: 'https://images.unsplash.com/photo-1526304640152-d4619684e484?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 4,
    title: 'Choosing the Right Tech Stack for Your MVP',
    excerpt: 'React vs. Vue? Node vs. Python? We break down the pros and cons to help you make the right decision for your startup.',
    author: 'Emily Davis',
    date: 'Feb 15, 2024',
    readTime: '8 min read',
    category: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 5,
    title: 'The Hidden Costs of Technical Debt',
    excerpt: 'What you save now might cost you double later. Understanding the long-term financial impact of code quality.',
    author: 'David Wilson',
    date: 'Feb 01, 2024',
    readTime: '5 min read',
    category: 'Engineering Management',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 6,
    title: 'Remote vs. On-site: A Cost Analysis',
    excerpt: 'Comparing the total cost of ownership for remote teams versus traditional office-based development squads.',
    author: 'Sarah Johnson',
    date: 'Jan 20, 2024',
    readTime: '7 min read',
    category: 'Team Structure',
    imageUrl: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

const Blog: React.FC<BlogProps> = ({ navigate, onPostClick }) => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 flex-grow w-full">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Our Blog</h2>
          <p className="mt-2 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Latest Insights & News
          </p>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Stay up to date with the latest trends in software development, cost estimation, and engineering management.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => onPostClick(post)}
            >
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={post.imageUrl} alt={post.title} />
              </div>
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    {post.category}
                  </p>
                  <div className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                      {post.title}
                    </p>
                    <p className="mt-3 text-base text-gray-500">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <span className="sr-only">{post.author}</span>
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                        {post.author.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                      {post.author}
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={post.date}>{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Load More Articles
          </button>
        </div>
      </div>
      <Footer navigate={navigate} />
    </div>
  );
};

export default Blog;
