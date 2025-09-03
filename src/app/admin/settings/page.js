import { getLocalBusinessSettings, getOrganizationSettings } from '@/services/db';
import { updateLocalBusinessAction, updateOrganizationAction } from '@/services/server/settings';

export default async function SettingsAdminPage() {
  const settings = await getLocalBusinessSettings();
  const orgSettings = await getOrganizationSettings();

  return (
    <main style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      <h1>Site Settings</h1>

      {/* --- Organization Form --- */}
      <h2 style={{ marginTop: '40px' }}>Organization Information</h2>
      <form action={updateOrganizationAction} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
         <div>
          <label htmlFor="org_name">Organization Name</label>
          <input id="org_name" name="org_name" type="text" defaultValue={orgSettings.name} style={{ width: '100%', padding: '8px' }} required />
        </div>
         <div>
          <label htmlFor="org_url">URL</label>
          <input id="org_url" name="org_url" type="url" defaultValue={orgSettings.url} style={{ width: '100%', padding: '8px' }} />
        </div>
         <div>
          <label htmlFor="org_logo">Logo URL</label>
          <input id="org_logo" name="org_logo" type="url" defaultValue={orgSettings.logo} style={{ width: '100%', padding: '8px' }} />
        </div>
        <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white' }}>Save Organization Settings</button>
      </form>




      <h2 style={{ marginTop: '20px' }}>Local Business Information</h2>
      
      <form action={updateLocalBusinessAction} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <div>
          <label htmlFor="name">Business Name</label>
          <input id="name" name="name" type="text" defaultValue={settings.name} style={{ width: '100%', padding: '8px' }} required />
        </div>
        <div>
          <label htmlFor="streetAddress">Street Address</label>
          <input id="streetAddress" name="streetAddress" type="text" defaultValue={settings.streetAddress} style={{ width: '100%', padding: '8px' }} />
        </div>
        <div>
          <label htmlFor="addressLocality">City</label>
          <input id="addressLocality" name="addressLocality" type="text" defaultValue={settings.addressLocality} style={{ width: '100%', padding: '8px' }} />
        </div>
        <div>
          <label htmlFor="addressRegion">State / Region</label>
          <input id="addressRegion" name="addressRegion" type="text" defaultValue={settings.addressRegion} style={{ width: '100%', padding: '8px' }} />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input id="postalCode" name="postalCode" type="text" defaultValue={settings.postalCode} style={{ width: '100%', padding: '8px' }} />
        </div>
         <div>
          <label htmlFor="telephone">Telephone</label>
          <input id="telephone" name="telephone" type="tel" defaultValue={settings.telephone} style={{ width: '100%', padding: '8px' }} />
        </div>
         <div>
          <label htmlFor="priceRange">Price Range (e.g., $$)</label>
          <input id="priceRange" name="priceRange" type="text" defaultValue={settings.priceRange} style={{ width: '100%', padding: '8px' }} />
        </div>
        <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white' }}>Save Settings</button>
      </form>
    </main>
  );
}