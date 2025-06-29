import React from 'react';

// Generated component from Figma (using divs for visual testing)
function GeneratedLogin() {
  return (
    <main data-model-id="2:530">
      <div className="w-[1440px] h-[900px] flex flex-row gap-[32px] p-[32px]" data-model-id="2:531">
        <div className="w-[672px] h-[836px] w-full h-full absolute top-[32px] left-[32px] bg-[#0d0d1b] rounded-[24px] flex items-center justify-center text-white" data-model-id="2:532">
          © 2025 ALL RIGHTS RESERVED
        </div>
        <button className="w-[418px] h-12 w-full absolute top-[537px] left-[863px] flex flex-row gap-3 bg-[#1d61e7] rounded-xl shadow-sm pt-[10px] pr-[24px] pb-[10px] pl-[24px] text-white font-semibold justify-center items-center" data-model-id="I2:991;139:14380">
          Log in
        </button>
        <button className="w-[418px] h-12 w-full absolute top-[637px] left-[863px] flex flex-row gap-3 bg-white rounded-xl border border-[#f2f4f8] pt-[10px] pr-[24px] pb-[10px] pl-[24px] text-black font-semibold justify-center items-center" data-model-id="I2:997;139:14440">
          Continue with Google
        </button>
        <button className="w-[418px] h-12 w-full absolute top-[700px] left-[863px] flex flex-row gap-3 bg-white rounded-xl border border-[#f2f4f8] pt-[10px] pr-[24px] pb-[10px] pl-[24px] text-black font-semibold justify-center items-center" data-model-id="I2:998;139:14440">
          Continue in with Microsoft
        </button>
        <div className="w-[36px] h-5 w-auto h-auto absolute top-[317px] left-[863px] bg-[#0d0d1b] text-sm font-normal text-left leading-[20px] text-white" data-model-id="2:966">
          Email
        </div>
        <div className="w-[390px] h-6 w-full h-auto absolute top-[353px] left-[877px] bg-[#878d96] text-base font-normal text-left leading-[24px] text-white" data-model-id="2:970">
          Enter your email
        </div>
        <div className="w-[65px] h-5 w-auto h-auto absolute top-[407px] left-[863px] bg-[#0d0d1b] text-sm font-normal text-left leading-[20px] text-white" data-model-id="2:975">
          Password
        </div>
        <div className="w-24 h-5 w-auto h-auto absolute top-[493px] left-[887px] bg-[#0d0d1b] text-sm font-normal text-left leading-[20px] text-white" data-model-id="2:987">
          Remember me
        </div>
        <div className="w-[114px] h-5 w-auto h-auto absolute top-[493px] left-[1167px] bg-[#fe701e] text-sm font-semibold text-left leading-[20px] text-white" data-model-id="2:989">
          Forgot password
        </div>
      </div>
    </main>
  );
}

export default function FigmaPreview() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">Figma-to-Code Preview</h1>
          <p className="text-gray-600 mb-6">
            Generated Login component from Figma design
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 overflow-auto">
            <div className="relative" style={{ width: '1440px', height: '900px' }}>
              <GeneratedLogin />
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-semibold">Key Elements Found:</h3>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>✅ "Log in" button (blue)</li>
                <li>✅ "Continue with Google" button</li>
                <li>✅ "Continue with Microsoft" button</li>
                <li>✅ Email label and placeholder</li>
                <li>✅ Password label</li>
                <li>✅ "Remember me" checkbox text</li>
                <li>✅ "Forgot password" link</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Potential Issues:</h3>
              <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                <li>⚠️ Absolute positioning may cause overlaps</li>
                <li>⚠️ Missing actual input fields</li>
                <li>⚠️ Fixed 1440px width (not responsive)</li>
                <li>⚠️ Some elements may be duplicated</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 