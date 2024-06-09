import React from 'react';
import { Link } from '@inertiajs/inertia-react';

const Pagination = ({links }) => {
    return (
        <div className="flex justify-center mt-6">
            {links.map((link, index) => (
                <Link
                    key={index}
                    href={link.url}
                    className={`px-4 py-2 mx-1 border rounded ${
                        link.active ? 'bg-gray-200' : ''
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                ></Link>
            ))}
        </div>
    );
};

export default Pagination;
