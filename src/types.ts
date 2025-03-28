/**
 * Common TypeScript types and interfaces for the application
 */
import React from "react";

// Example of a basic user interface
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Example of a component with children props
export interface PropsWithChildren {
  children: React.ReactNode;
}

// Example for component with className prop
export interface PropsWithClassName {
  className?: string;
}

// Type for API response
export type ApiResponse<T> = {
  data: T;
  success: boolean;
  error?: string;
};

// Type for pagination
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (/* pageNumber: number */) => void;
}

// Type for image item in the slider
export interface ImageItem {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

// Type for nested comments
export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: Date;
  replies?: Comment[];
}

// Type for custom event handler
export type CustomEventHandler = () => void;

/**
 * Add your own type definitions here as needed for components
 */
