import React from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';


const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-white">Job Hunt</h2>
            <p className="mt-4 text-sm">
              Your gateway to the best opportunities. Empowering job seekers and connecting them with their dream roles.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-gray-400">About Us</a></li>
              <li><a href="#jobs" className="hover:text-gray-400">Find Jobs</a></li>
              <li><a href="#contact" className="hover:text-gray-400">Contact</a></li>
              <li><a href="#privacy" className="hover:text-gray-400">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Stay Updated</h3>
            <p className="text-sm mb-4">
              Subscribe to our newsletter for the latest updates and job alerts.
            </p>
            <form className="flex justify-start   w-full overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full  rounded-l-md px-5"
              />
              <Button
                type="submit"
                className={cn( 
                  ' rounded-none rounded-r-md py-2 bg-primary text-white',
                  'hover:bg-primary/90'
                )}
              >
                Subscribe
              </Button>
            </form>
          </div>


          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" className="hover:text-teal-500" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" />
                </svg>
              </a>
              <a href="https://twitter.com" className="hover:text-teal-500" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" />
                </svg>
              </a>
              <a href="https://linkedin.com" className="hover:text-teal-500" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
                </svg>
              </a>
              <a href="https://instagram.com" className="hover:text-teal-500" aria-label="Instagram">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.31.975.975 1.248 2.242 1.31 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.31 3.608-.975.975-2.242 1.248-3.608 1.31-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.31-.975-.975-1.248-2.242-1.31-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.31-3.608.975-.975 2.242-1.248 3.608-1.31 1.266-.058 1.646-.07 4.85-.07m0-2.163C8.718 0 8.332 0 7.05.05c-1.285.05-2.446.264-3.548.794-1.228.598-2.2 1.57-2.797 2.797-.53 1.102-.744 2.263-.794 3.548C0 8.332 0 8.718 0 12s0 3.668.05 4.95c.05 1.285.264 2.446.794 3.548.598 1.228 1.57 2.2 2.797 2.797 1.102.53 2.263.744 3.548.794 1.282.05 1.668.05 4.95.05s3.668 0 4.95-.05c1.285-.05 2.446-.264 3.548-.794 1.228-.598 2.2-1.57 2.797-2.797.53-1.102.744-2.263.794-3.548C24 15.668 24 15.282 24 12s0-3.668-.05-4.95c-.05-1.285-.264-2.446-.794-3.548-.598-1.228-1.57-2.2-2.797-2.797C19.446.264 18.285.05 17.05 0c-1.282-.05-1.668-.05-4.95-.05zM12 5.838c-3.409 0-6.162 2.753-6.162 6.162S8.591 18.162 12 18.162s6.162-2.753 6.162-6.162S15.409 5.838 12 5.838zm0 10.324c-2.296 0-4.162-1.866-4.162-4.162S9.704 7.838 12 7.838s4.162 1.866 4.162 4.162-1.866 4.162-4.162 4.162zm6.406-10.92a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Job Hunt. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
