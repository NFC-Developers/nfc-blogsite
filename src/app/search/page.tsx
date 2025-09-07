"use client";

import React, { useState, useEffect } from "react";
import { Search, Filter, X, Tag, User, Calendar, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface SearchResult {
  type: 'story' | 'post' | 'user';
  id: string;
  title: string;
  content?: string;
  author?: string;
  authorUsername?: string;
  createdAt: string;
  tags?: string[];
  profileImage?: string;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'stories' | 'posts' | 'users'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Save recent search
  const saveRecentSearch = (query: string) => {
    if (query.trim() && !recentSearches.includes(query)) {
      const updated = [query, ...recentSearches.slice(0, 4)];
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }
  };

  // Remove recent search
  const removeRecentSearch = (query: string) => {
    const updated = recentSearches.filter(q => q !== query);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Search function
  const handleSearch = async (query: string = searchQuery) => {
    if (!query.trim()) return;
    
    setLoading(true);
    saveRecentSearch(query);
    
    try {
      // Mock search results - replace with actual API calls
      const mockResults: SearchResult[] = [
        {
          type: 'story' as const,
          id: '1',
          title: 'The Adventures of Digital Nomad',
          content: 'A thrilling story about a programmer who travels the world while working remotely...',
          author: 'Jane Doe',
          authorUsername: 'janedoe',
          createdAt: '2024-01-15',
          tags: ['adventure', 'technology', 'travel']
        },
        {
          type: 'post' as const,
          id: '2',
          title: 'Best Practices for React Development',
          content: 'Learn the essential patterns and techniques for building scalable React applications...',
          author: 'John Smith',
          authorUsername: 'johnsmith',
          createdAt: '2024-01-10',
          tags: ['react', 'programming', 'web-development']
        },
        {
          type: 'user' as const,
          id: '3',
          title: 'Emily Chen',
          authorUsername: 'emilychen',
          createdAt: '2024-01-05',
          profileImage: '/images/profile-placeholder.jpg'
        }
      ].filter(result => {
        if (selectedFilter === 'all') return true;
        if (selectedFilter === 'stories') return result.type === 'story';
        if (selectedFilter === 'posts') return result.type === 'post';
        if (selectedFilter === 'users') return result.type === 'user';
        return true;
      }).filter(result => 
        result.title.toLowerCase().includes(query.toLowerCase()) ||
        result.content?.toLowerCase().includes(query.toLowerCase()) ||
        result.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );

      setSearchResults(mockResults);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-red-50 dark:from-gray-900 dark:via-slate-900 dark:to-pink-950">
      {/* Header with search bar */}
      <div className="bg-blue-600 dark:bg-blue-800 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-6 text-center">
              Search Stories, Posts & Users
            </h1>
            
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search for stories, posts, or users..."
                className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent outline-none"
              />
              <button
                onClick={() => handleSearch()}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-pink-600 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>

            {/* Filter Toggle */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="flex flex-wrap gap-2">
                  {(['all', 'stories', 'posts', 'users'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedFilter === filter
                          ? 'bg-pink-600 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Recent Searches */}
          {!searchQuery && recentSearches.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Searches
              </h2>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((query, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                  >
                    <button
                      onClick={() => {
                        setSearchQuery(query);
                        handleSearch(query);
                      }}
                      className="text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-400"
                    >
                      {query}
                    </button>
                    <button
                      onClick={() => removeRecentSearch(query)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-pink-600 border-t-transparent"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Searching...</span>
            </div>
          )}

          {/* Search Results */}
          {!loading && searchResults.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Search Results ({searchResults.length})
              </h2>
              
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  {result.type === 'user' ? (
                    <Link href={`/${result.authorUsername}`} className="block">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                          {result.profileImage ? (
                            <Image
                              src={result.profileImage}
                              alt={result.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {result.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            @{result.authorUsername}
                          </p>
                        </div>
                        <div className="ml-auto">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            <User className="h-3 w-3 mr-1" />
                            User
                          </span>
                        </div>
                      </div>
                    </Link>
                  ) : (
                    <Link href={result.type === 'story' ? `/story/${result.id}` : `/post/${result.id}`}>
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                            {result.title}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            result.type === 'story' 
                              ? 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                            {result.type === 'story' ? (
                              <>
                                <BookOpen className="h-3 w-3 mr-1" />
                                Story
                              </>
                            ) : (
                              <>
                                <Tag className="h-3 w-3 mr-1" />
                                Post
                              </>
                            )}
                          </span>
                        </div>
                        
                        {result.content && (
                          <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                            {result.content}
                          </p>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>By {result.author}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(result.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        {result.tags && result.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {result.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && searchQuery && searchResults.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No results found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try adjusting your search or filters to find what you&apos;re looking for.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !searchQuery && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Start searching
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Search for stories, posts, or users to discover amazing content.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
