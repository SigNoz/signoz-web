'use client'
import UpgradePathTool from './components/UpgradePathTool';

function App({ params }: { params: { slug: string[] } }) {
  return (
    <>
    {/* <header className="relative !mx-auto !w-[100vw] md:!w-[80vw]"> */}
    <header className="relative !mx-auto">
      <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[0] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px]" />
      <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
      <div className="relative !mx-auto flex flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 pb-4 pt-12 md:pt-[8.5rem]">
        <UpgradePathTool />
      </div>
    </header>
    </>
  )
}

export default App;