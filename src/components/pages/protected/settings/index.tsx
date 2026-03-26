import React, { useEffect, useRef, useState } from 'react';

type TabKey = 'account' | 'security' | 'notifications' | 'interface' | 'additional';

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('account');

  // form state
  const [fullName, setFullName] = useState('Christine Brown');
  const [email, setEmail] = useState('christinebrown@gmail.com');
  const [username, setUsername] = useState('christinebrown');
  const [phone, setPhone] = useState('+1 945-913-2196');
  const [bio, setBio] = useState(
    "Senior blog writer at Hamill Group since 2017.\nI've also been lucky enough to work for the Parisian LLC."
  );

  const [emailVerified] = useState(true);
  const [phoneVerified] = useState(true);

  // avatar upload
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    return () => {
      if (avatarUrl) URL.revokeObjectURL(avatarUrl);
    };
  }, [avatarUrl]);

  const onSelectFile = (file?: File) => {
    if (!file) return;
    if (avatarUrl) URL.revokeObjectURL(avatarUrl);
    const url = URL.createObjectURL(file);
    setAvatarUrl(url);
    setAvatarFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onSelectFile(f);
  };

  const removeAvatar = () => {
    if (avatarUrl) URL.revokeObjectURL(avatarUrl);
    setAvatarUrl(null);
    setAvatarFile(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleUpdateProfile = () => {
    // minimal client-side validation
    if (!fullName.trim()) return alert('Full name is required');
    if (!email.trim()) return alert('Email is required');
    // send to API or update store here. For now just log.
    console.log({ fullName, email, username, phone, bio, avatarFile });
    alert('Profile updated (demo)');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b">
          <nav className="flex gap-4 p-4" aria-label="Settings tabs">
            <button
              className={`px-3 py-2 rounded-md text-sm ${activeTab === 'account' ? 'bg-purple-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('account')}
            >
              Account Settings
            </button>
            <button
              className={`px-3 py-2 rounded-md text-sm ${activeTab === 'security' ? 'bg-purple-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('security')}
            >
              Login & Security
            </button>
            <button
              className={`px-3 py-2 rounded-md text-sm ${activeTab === 'notifications' ? 'bg-purple-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('notifications')}
            >
              Notification Settings
            </button>
            <button
              className={`px-3 py-2 rounded-md text-sm ${activeTab === 'interface' ? 'bg-purple-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('interface')}
            >
              Interface
            </button>
            <button
              className={`px-3 py-2 rounded-md text-sm ${activeTab === 'additional' ? 'bg-purple-600 text-white' : 'text-gray-600'}`}
              onClick={() => setActiveTab('additional')}
            >
              Additional Settings
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'account' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="text-sm text-gray-500 mb-3">Your Profile Picture</div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-gray-400">No image</div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="inline-flex items-center gap-2">
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileRef.current?.click()}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md text-sm"
                      >
                        Upload New
                      </button>
                    </label>
                    <button onClick={removeAvatar} className="px-4 py-2 border rounded-md text-sm">
                      Remove Profile Picture
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500">Full name</label>
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="mt-1 block w-full border rounded-md px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">Email address</label>
                    <div className="mt-1 flex items-center gap-3">
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 border rounded-md px-3 py-2"
                      />
                      {emailVerified ? (
                        <span className="text-xs text-green-600">Verified</span>
                      ) : (
                        <span className="text-xs text-gray-400">Unverified</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">Username</label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="mt-1 block w-full border rounded-md px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500">Phone number</label>
                    <div className="mt-1 flex items-center gap-3">
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 border rounded-md px-3 py-2"
                      />
                      {phoneVerified ? (
                        <span className="text-xs text-green-600">Verified</span>
                      ) : (
                        <span className="text-xs text-gray-400">Unverified</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-xs text-gray-500">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={5}
                    className="mt-1 block w-full border rounded-md px-3 py-2 text-sm"
                  />
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleUpdateProfile}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md"
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h3 className="font-semibold mb-2">Login & Security</h3>
              <p className="text-sm text-gray-500">
                Manage your password, two-factor authentication, and connected devices.
                (Placeholder)
              </p>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h3 className="font-semibold mb-2">Notification Settings</h3>
              <p className="text-sm text-gray-500">
                Control email and push notifications. (Placeholder)
              </p>
            </div>
          )}

          {activeTab === 'interface' && (
            <div>
              <h3 className="font-semibold mb-2">Interface</h3>
              <p className="text-sm text-gray-500">
                Theme, layout and language preferences. (Placeholder)
              </p>
            </div>
          )}

          {activeTab === 'additional' && (
            <div>
              <h3 className="font-semibold mb-2">Additional Settings</h3>
              <p className="text-sm text-gray-500">
                Other application specific settings. (Placeholder)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
