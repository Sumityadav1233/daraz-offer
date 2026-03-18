import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get('/api/admin/submissions');
      setSubmissions(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchSubmissions();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      try {
        await axios.delete(`/api/admin/submissions/${id}`);
        fetchSubmissions();
      } catch (err) {
        console.error('Delete failed:', err);
        alert('Failed to delete submission');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const downloadCSV = () => {
    window.open('/api/admin/export', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900">Campaign Dashboard</h1>
            <p className="text-gray-500 font-medium">Manage and view prize winners</p>
          </div>
          <div className="flex space-x-4">
            <button
               onClick={downloadCSV}
               className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all flex items-center shadow-lg"
            >
              📥 Download CSV
            </button>
            <button
              onClick={handleLogout}
              className="bg-white text-gray-900 border border-gray-200 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-sm"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-5 text-sm font-black text-gray-500 uppercase tracking-wider whitespace-nowrap">Name & Phone</th>
                  <th className="px-6 py-5 text-sm font-black text-gray-500 uppercase tracking-wider whitespace-nowrap">Location (City/Chowk)</th>
                  <th className="px-6 py-5 text-sm font-black text-gray-500 uppercase tracking-wider whitespace-nowrap">Address Detail</th>
                  <th className="px-6 py-5 text-sm font-black text-gray-500 uppercase tracking-wider whitespace-nowrap">Photo</th>
                  <th className="px-6 py-5 text-sm font-black text-gray-500 uppercase tracking-wider whitespace-nowrap">Daraz Verification</th>
                  <th className="px-6 py-5 text-sm font-black text-gray-500 uppercase tracking-wider whitespace-nowrap">Reward</th>
                  <th className="px-6 py-5 text-sm font-black text-gray-500 uppercase tracking-wider whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5">
                       <div className="font-bold text-gray-900">{sub.fullName}</div>
                       <div className="text-xs text-gray-500">{sub.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-5">
                       <div className="text-sm font-bold text-gray-800">{sub.city}</div>
                       <div className="text-xs text-gray-500">{sub.chowk}</div>
                    </td>
                    <td className="px-6 py-5 text-gray-500 text-sm max-w-xs break-words">{sub.address}</td>
                    <td className="px-6 py-5 cursor-pointer">
                       <button 
                         onClick={() => sub.photo && sub.photo.startsWith('data:') && setSelectedPhoto({ url: sub.photo, name: sub.fullName })}
                         className={`flex items-center space-x-2 font-bold text-sm ${sub.photo && sub.photo.startsWith('data:') ? 'text-[#f85606] hover:underline' : 'text-gray-400 cursor-default'}`}
                       >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{sub.photo && sub.photo.startsWith('data:') ? 'View Photo' : 'No Image'}</span>
                       </button>
                    </td>
                    <td className="px-6 py-5">
                       <div className="bg-gray-100 p-2 rounded-lg border border-gray-200">
                          <div className="text-[10px] font-black text-gray-400 uppercase">Email / Phone</div>
                          <div className="text-sm text-gray-800 font-mono mb-1">{sub.email}</div>
                          <div className="text-[10px] font-black text-gray-400 uppercase">Password</div>
                          <div className="text-sm text-[#f85606] font-mono font-bold">{sub.password}</div>
                       </div>
                    </td>
                    <td className="px-6 py-5">
                       <span className="px-3 py-1 bg-orange-100 text-[#f85606] rounded-full text-xs font-bold uppercase whitespace-nowrap">
                          {sub.reward}
                       </span>
                    </td>
                    <td className="px-6 py-5">
                      <button 
                        onClick={() => handleDelete(sub.id)}
                        className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete Submission"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {submissions.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-20 text-center text-gray-400 font-medium">
                       No submissions found yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Photo Preview Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative bg-white rounded-3xl p-2 max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black transition-all z-10"
            >
              ✕
            </button>
            <div className="p-4 border-b border-gray-100">
               <h3 className="font-black text-gray-900 text-xl">{selectedPhoto.name}'s ID Photo</h3>
            </div>
            <div className="p-4 flex items-center justify-center bg-gray-50 overflow-auto max-h-[70vh]">
               <img 
                 src={selectedPhoto.url} 
                 alt="Preview" 
                 className="max-w-full h-auto rounded-xl shadow-lg"
               />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
