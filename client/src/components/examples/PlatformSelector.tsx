import { useState } from 'react';
import PlatformSelector from '../PlatformSelector';

export default function PlatformSelectorExample() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['twitter', 'linkedin']);

  return (
    <div className="max-w-sm mx-auto p-4">
      <PlatformSelector 
        selectedPlatforms={selectedPlatforms}
        onSelectionChange={setSelectedPlatforms}
      />
    </div>
  );
}