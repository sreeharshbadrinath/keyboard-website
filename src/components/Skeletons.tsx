import React from 'react';

/**
 * Product Catalog Shimmer Skeleton Loader
 * Mirrors the exact visual structure, spacing, and proportions of ProductCatalog
 */
export const ProductCatalogSkeleton: React.FC = () => {
  return (
    <div className="w-full animate-in fade-in duration-300">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/10">
        <div className="space-y-3">
          <div className="w-32 h-5 rounded-full shimmer-placeholder" />
          <div className="w-72 sm:w-96 h-10 rounded-lg shimmer-placeholder" />
        </div>
        <div className="space-y-2 max-w-md w-full">
          <div className="w-full h-4 rounded shimmer-placeholder" />
          <div className="w-3/4 h-4 rounded shimmer-placeholder" />
        </div>
      </div>

      {/* Grid Skeleton - 4 Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {[0, 1, 2, 3].map((idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-black/[0.08] shadow-xs overflow-hidden flex flex-col justify-between"
          >
            {/* Upper Content */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Badge & Rating */}
              <div className="flex items-center justify-between">
                <div className="w-24 h-6 rounded-full shimmer-placeholder" />
                <div className="w-28 h-4 rounded shimmer-placeholder" />
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-2">
                <div className="w-2/3 h-8 rounded-lg shimmer-placeholder" />
                <div className="w-1/2 h-4 rounded shimmer-placeholder" />
              </div>

              {/* Simulated Keyboard Canvas Placeholder */}
              <div className="w-full h-44 rounded-xl shimmer-placeholder-dark p-4 flex flex-col justify-center items-center gap-2">
                <div className="w-3/4 h-5 rounded shimmer-placeholder-dark opacity-60" />
                <div className="w-5/6 h-5 rounded shimmer-placeholder-dark opacity-40" />
                <div className="w-2/3 h-5 rounded shimmer-placeholder-dark opacity-50" />
              </div>

              {/* Switch Selector Row */}
              <div className="space-y-2.5">
                <div className="w-40 h-3 rounded shimmer-placeholder" />
                <div className="flex flex-wrap gap-2">
                  <div className="w-20 h-7 rounded-lg shimmer-placeholder" />
                  <div className="w-24 h-7 rounded-lg shimmer-placeholder" />
                  <div className="w-20 h-7 rounded-lg shimmer-placeholder" />
                  <div className="w-22 h-7 rounded-lg shimmer-placeholder" />
                </div>
              </div>

              {/* Bullet Features */}
              <div className="space-y-2 pt-4 border-t border-neutral-100">
                <div className="w-full h-3.5 rounded shimmer-placeholder" />
                <div className="w-4/5 h-3.5 rounded shimmer-placeholder" />
                <div className="w-3/4 h-3.5 rounded shimmer-placeholder" />
              </div>
            </div>

            {/* Price & Action Button Footer */}
            <div className="p-6 sm:p-8 bg-neutral-50/70 border-t border-neutral-100 flex items-center justify-between">
              <div className="space-y-1.5">
                <div className="w-16 h-3 rounded shimmer-placeholder" />
                <div className="w-24 h-8 rounded-lg shimmer-placeholder" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full shimmer-placeholder" />
                <div className="w-36 h-10 rounded-full shimmer-placeholder" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Switch Explorer Shimmer Skeleton Loader
 * Mirrors the exact 2-column layout and component architecture of SwitchExplorer
 */
export const SwitchExplorerSkeleton: React.FC = () => {
  return (
    <div className="w-full animate-in fade-in duration-300">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/10">
        <div className="space-y-3">
          <div className="w-28 h-5 rounded-full shimmer-placeholder" />
          <div className="w-64 sm:w-80 h-10 rounded-lg shimmer-placeholder" />
        </div>
        <div className="space-y-2 max-w-md w-full">
          <div className="w-full h-4 rounded shimmer-placeholder" />
          <div className="w-2/3 h-4 rounded shimmer-placeholder" />
        </div>
      </div>

      {/* 2-Column Body Layout */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 5 Switch Items */}
        <div className="lg:col-span-7 space-y-2.5">
          {[0, 1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="w-full p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200/80 flex items-center justify-between"
            >
              <div className="flex items-center gap-4 sm:gap-6">
                {/* Index number */}
                <div className="w-6 h-6 rounded shimmer-placeholder" />
                {/* Name & Subtitle */}
                <div className="space-y-1.5">
                  <div className="w-36 sm:w-48 h-5 rounded-md shimmer-placeholder" />
                  <div className="w-48 sm:w-64 h-3 rounded shimmer-placeholder" />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-16 h-6 rounded-full shimmer-placeholder" />
                <div className="w-4 h-4 rounded shimmer-placeholder" />
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Active Switch Preview Card */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-black/[0.08] shadow-xs space-y-6">
          {/* Visual Stem & Housing Graphic Container */}
          <div className="w-full h-56 shimmer-placeholder-dark rounded-xl flex flex-col items-center justify-center p-6 space-y-4">
            <div className="w-20 h-20 rounded-2xl shimmer-placeholder-dark border border-neutral-700/50" />
            <div className="w-32 h-3 rounded shimmer-placeholder-dark opacity-50" />
          </div>

          {/* Details & Specs */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="w-36 h-7 rounded-lg shimmer-placeholder" />
                <div className="w-24 h-3.5 rounded shimmer-placeholder" />
              </div>
              <div className="w-28 h-9 rounded-full shimmer-placeholder" />
            </div>

            <div className="space-y-2">
              <div className="w-full h-3.5 rounded shimmer-placeholder" />
              <div className="w-4/5 h-3.5 rounded shimmer-placeholder" />
            </div>

            {/* Spec Cards */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-neutral-100">
              <div className="p-3 bg-neutral-50 rounded-xl space-y-2">
                <div className="w-20 h-3 rounded shimmer-placeholder" />
                <div className="w-16 h-5 rounded shimmer-placeholder" />
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl space-y-2">
                <div className="w-20 h-3 rounded shimmer-placeholder" />
                <div className="w-16 h-5 rounded shimmer-placeholder" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
