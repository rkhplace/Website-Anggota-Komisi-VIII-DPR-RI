import { fetchFromStrapi } from '@/lib/strapi';
import ProfileImage from '@/components/ProfileImage';

type ProfileResponse = {
  data: {
    id: number;
    name: string;
    role: string;
    shortGreeting?: any;
    biography?: any;
    education?: string[];
    experiences?: string[];
    vision?: any;
    mission?: string[];
    photo?: {
      id: number;
      name: string;
      url: string;
      formats?: {
        thumbnail?: {
          url: string;
        };
        small?: {
          url: string;
        };
      };
    } | null;
  };
};

export default async function DebugPage() {
  let profileData: ProfileResponse | null = null;
  let error: Error | null = null;

  try {
    profileData = await fetchFromStrapi<ProfileResponse>('/api/profile?populate=*');
  } catch (err) {
    error = err as Error;
  }

  const photoUrl = profileData?.data?.photo?.url ? 
    `${process.env.NEXT_PUBLIC_STRAPI_URL}${profileData.data.photo.url}` : null;
  
  const thumbnailUrl = profileData?.data?.photo?.formats?.thumbnail?.url ? 
    `${process.env.NEXT_PUBLIC_STRAPI_URL}${profileData.data.photo.formats.thumbnail.url}` : null;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Debug API Response</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error.toString()}
        </div>
      )}

      {profileData && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <strong>Success!</strong> Data received from Strapi
        </div>
      )}

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Raw API Response:</h2>
        <pre className="text-sm overflow-auto">
          {JSON.stringify(profileData, null, 2)}
        </pre>
      </div>

      {profileData && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Extracted Data:</h2>
          <div className="bg-white border p-4 rounded space-y-2">
            <p><strong>Name:</strong> {profileData.data?.name || 'Not found'}</p>
            <p><strong>Role:</strong> {profileData.data?.role || 'Not found'}</p>
            <p><strong>Short Greeting:</strong> {JSON.stringify(profileData.data?.shortGreeting)}</p>
            <p><strong>Biography:</strong> {JSON.stringify(profileData.data?.biography)}</p>
            <p><strong>Education:</strong> {JSON.stringify(profileData.data?.education)}</p>
            <p><strong>Experiences:</strong> {JSON.stringify(profileData.data?.experiences)}</p>
            <p><strong>Vision:</strong> {JSON.stringify(profileData.data?.vision)}</p>
            <p><strong>Mission:</strong> {JSON.stringify(profileData.data?.mission)}</p>
            
            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold mb-2">Photo Information:</h3>
              <p><strong>Photo Data:</strong> {JSON.stringify(profileData.data?.photo)}</p>
              <p><strong>Photo URL:</strong> {photoUrl || 'No photo URL'}</p>
              <p><strong>Thumbnail URL:</strong> {thumbnailUrl || 'No thumbnail URL'}</p>
              <p><strong>Environment STRAPI_URL:</strong> {process.env.NEXT_PUBLIC_STRAPI_URL || 'Not set'}</p>
              
              {photoUrl && (
                <div className="mt-4">
                  <p><strong>Photo Preview:</strong></p>
                  <div className="flex gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Original:</p>
                      <ProfileImage 
                        src={photoUrl} 
                        alt="Profile Photo" 
                        className="w-32 h-32 object-cover"
                        effect="bounce"
                        gradientBlur={true}
                      />
                      <p className="text-red-500 text-sm" style={{display: 'none'}}>
                        ❌ Photo tidak bisa dimuat. Cek URL: {photoUrl}
                      </p>
                    </div>
                    
                    {thumbnailUrl && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Thumbnail:</p>
                        <ProfileImage 
                          src={thumbnailUrl} 
                          alt="Profile Photo Thumbnail" 
                          className="w-32 h-32 object-cover"
                          effect="flip"
                          gradientBlur={true}
                        />
                        <p className="text-red-500 text-sm" style={{display: 'none'}}>
                          ❌ Thumbnail tidak bisa dimuat. Cek URL: {thumbnailUrl}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 border border-blue-200 p-4 rounded">
        <h2 className="text-lg font-semibold mb-2">Troubleshooting Tips:</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Jika photo tidak muncul, upload photo di Strapi Admin → Content Manager → Profile</li>
          <li>Pastikan photo di-publish setelah upload</li>
          <li>Cek apakah photo URL bisa diakses langsung di browser</li>
          <li>Restart frontend setelah mengubah environment variables</li>
          <li>Clear browser cache dengan Ctrl+F5</li>
        </ul>
      </div>
    </div>
  );
}
