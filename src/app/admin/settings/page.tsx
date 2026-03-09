import React from 'react';
import { getSettings } from '@/actions/settingsActions';
import HeroSettingsForm from '@/components/admin/HeroSettingsForm';

export default async function SettingsPage() {
    const settings = await getSettings();

    return (
        <div className="flex flex-col gap-8">
            <HeroSettingsForm initialData={settings} />
        </div>
    );
}
