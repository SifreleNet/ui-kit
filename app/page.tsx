'use client';

import React, { useState } from 'react';

import { COMPONENT_REGISTRY, REGISTRY_MAP } from '@/components/showroom/componentRegistry';
import ShowroomHeader from '@/components/showroom/ShowroomHeader';
import ShowroomSidebar from '@/components/showroom/ShowroomSidebar';
import InstallationGuide from '@/components/showroom/InstallationGuide';
import { DynamicPlayground } from '@/components/showroom/DynamicPlayground';
import { PropsController } from '@/components/showroom/PropsController';

// Build default props from the registry for each component
function buildDefaultProps(componentName: string): Record<string, any> {
  const meta = REGISTRY_MAP[componentName];
  if (!meta) return {};
  return Object.fromEntries(meta.controls.map((ctrl) => [ctrl.name, ctrl.defaultValue]));
}

export default function UIKitShowroom() {
  const [activeTab, setActiveTab] = useState('installation');

  // Props state: keyed by component name, lazily initialized from registry defaults
  const [allProps, setAllProps] = useState<Record<string, Record<string, any>>>(() => {
    const init: Record<string, Record<string, any>> = {};
    for (const comp of COMPONENT_REGISTRY) {
      init[comp.name] = buildDefaultProps(comp.name);
    }
    return init;
  });

  const handlePropChange = (componentName: string, propName: string, value: any) => {
    setAllProps((prev) => ({
      ...prev,
      [componentName]: { ...prev[componentName], [propName]: value },
    }));
  };

  const activeMeta = REGISTRY_MAP[activeTab];
  const activeProps = allProps[activeTab] ?? {};

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neon-green font-mono flex flex-col relative overflow-hidden">
      {/* CRT overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <div className="scanline-sweep" />
      </div>
      <div className="absolute inset-0 pointer-events-none crt-noise z-20" />

      {/* Header */}
      <ShowroomHeader />

      {/* Main */}
      <div className="flex-1 flex flex-col md:flex-row relative z-10 min-h-0 overflow-hidden">
        {/* Sidebar — reads directly from registry */}
        <ShowroomSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {activeTab === 'installation' ? (
            <InstallationGuide setActiveTab={setActiveTab} />
          ) : activeMeta ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch flex-1">
              {/* Left: Preview */}
              <DynamicPlayground meta={activeMeta} props={activeProps} />

              {/* Right: Props + Code */}
              <PropsController
                meta={activeMeta}
                props={activeProps}
                onPropChange={(name, value) => handlePropChange(activeTab, name, value)}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-white/20 text-xs font-mono">
              [ SELECT A COMPONENT FROM THE SIDEBAR ]
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
