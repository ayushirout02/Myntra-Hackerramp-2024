import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [skinUndertone, setSkinUndertone] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (skinUndertone) {
            setFormSubmitted(true);
            setTimeout(() => {
                navigate(`/profile-algo/${skinUndertone}`);
            }, 1500);
        } else {
            alert("Please select a skin undertone");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                    <div className="flex items-center space-x-4">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Profile Avatar"
                            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                        />
                        <div>
                            <h1 className="text-3xl font-bold">USER</h1>
                            <p className="text-purple-200">USER`@example.com</p>
                        </div>
                    </div>
                </div>
                
                <div className="p-8">
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-purple-600 mb-4">Personal Information</h2>
                        <div className="grid grid-cols-2 gap-4 text-gray-700">
                            <div><span className="font-medium">Name:</span> USER</div>
                            <div><span className="font-medium">Email:</span> USER@example.com</div>
                            <div><span className="font-medium">Birthday:</span> January 1, 1990</div>
                            <div><span className="font-medium">Gender:</span> FEMALE</div>
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="text-2xl font-semibold text-purple-600 mb-4">Skin Undertone</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="skinUndertone" className="block text-lg font-medium text-gray-700 mb-2">Choose Your Skin Undertone:</label>
                                <div className="flex justify-around mt-2">
                                    {['Warm', 'Neutral', 'Cool'].map((tone) => (
                                        <label key={tone} className="text-center group">
                                            <input
                                                type="radio"
                                                name="skinUndertone"
                                                value={tone}
                                                onChange={(e) => setSkinUndertone(e.target.value)}
                                                className="hidden"
                                            />
                                            <div className={`cursor-pointer rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${skinUndertone === tone ? 'ring-4 ring-purple-500 scale-105' : 'hover:scale-105'}`}>
                                                <img
                                                    src={`https://via.placeholder.com/150/${tone === 'Warm' ? 'FF6347' : tone === 'Neutral' ? 'FFD700' : '87CEEB'}/FFFFFF?text=${tone}`}
                                                    alt={`${tone} Undertone`}
                                                    className="w-24 h-24 object-cover"
                                                />
                                                <span className="block mt-2 font-medium text-gray-700 group-hover:text-purple-600">{tone}</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-600 transition duration-300"
                            >
                                Explore Styles
                            </button>
                        </form>
                        {formSubmitted && (
                            <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-lg animate-fade-in-down">
                                <p className="font-semibold">Thank you for submitting your preferences!</p>
                                <p><strong>Skin Undertone:</strong> {skinUndertone}</p>
                                <p>Redirecting to explore styles...</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;