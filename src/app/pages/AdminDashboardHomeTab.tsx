import { motion } from "motion/react";
import { Home as HomeIcon, BarChart3, Target, Zap, Lightbulb } from "lucide-react";

interface HomeTabProps {
  homeData: any;
  setHomeData: (data: any) => void;
  saveHomeData: () => void;
}

export default function AdminDashboardHomeTab({ homeData, setHomeData, saveHomeData }: HomeTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-medium mb-1">Home</h2>
          <p className="text-sm text-muted-foreground">Manage your home page content - mirrors frontend design</p>
        </div>
      </div>

      <div className="space-y-12">
        {/* PANEL 1: HERO SECTION */}
        <div className="bg-gradient-to-b from-muted/30 to-background border-2 border-primary/20 rounded-2xl p-8 shadow-sm">
          <div className="mb-6 pb-4 border-b-2 border-primary/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium text-primary">Panel 1</div>
              <h3 className="text-xl font-medium">Hero Section</h3>
            </div>
            <p className="text-sm text-muted-foreground">Main landing area with logo, heading, and CTAs</p>
          </div>
          
          <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <HomeIcon className="w-5 h-5" />
              Hero Section
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Logo Image URL</label>
                <input
                  type="text"
                  value={homeData.hero.logo}
                  onChange={(e) => setHomeData({...homeData, hero: {...homeData.hero, logo: e.target.value}})}
                  placeholder="Logo image path or URL"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground mt-1">Use imports path like: ../../imports/UX8_Logo_2.svg</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Main Heading (Line 1)</label>
                <input
                  type="text"
                  value={homeData.hero.heading1}
                  onChange={(e) => setHomeData({...homeData, hero: {...homeData.hero, heading1: e.target.value}})}
                  placeholder="First line of heading"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Main Heading (Line 2 - Highlighted)</label>
                <input
                  type="text"
                  value={homeData.hero.heading2}
                  onChange={(e) => setHomeData({...homeData, hero: {...homeData.hero, heading2: e.target.value}})}
                  placeholder="Second line of heading (gradient text)"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <textarea
                  value={homeData.hero.subtitle}
                  onChange={(e) => setHomeData({...homeData, hero: {...homeData.hero, subtitle: e.target.value}})}
                  placeholder="Brief introduction or tagline"
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Primary Button Text</label>
                  <input
                    type="text"
                    value={homeData.hero.button1}
                    onChange={(e) => setHomeData({...homeData, hero: {...homeData.hero, button1: e.target.value}})}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Secondary Button Text</label>
                  <input
                    type="text"
                    value={homeData.hero.button2}
                    onChange={(e) => setHomeData({...homeData, hero: {...homeData.hero, button2: e.target.value}})}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={saveHomeData}
              className="px-4 py-2 text-sm bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* PANEL 2: APPROACH SECTION */}
        <div className="bg-gradient-to-b from-muted/50 via-muted/30 to-muted/50 border-2 border-purple-500/20 rounded-2xl p-8 shadow-sm">
          <div className="mb-6 pb-4 border-b-2 border-purple-500/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="px-3 py-1 bg-purple-500/10 rounded-full text-sm font-medium text-purple-600">Panel 2</div>
              <h3 className="text-xl font-medium">Approach & Process</h3>
            </div>
            <p className="text-sm text-muted-foreground">Stats infographic and design process timeline</p>
          </div>

          {/* Section Header */}
          <div className="bg-background border border-border rounded-lg p-6 mb-6">
            <h4 className="font-medium mb-4">Section Header</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Main Heading</label>
                <textarea
                  value={homeData.approach.heading}
                  onChange={(e) => setHomeData({...homeData, approach: {...homeData.approach, heading: e.target.value}})}
                  rows={2}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={homeData.approach.description}
                  onChange={(e) => setHomeData({...homeData, approach: {...homeData.approach, description: e.target.value}})}
                  rows={2}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-background border border-border rounded-lg p-6 mb-6">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Stats Infographic (4 Cards)
            </h3>
            <div className="space-y-6">
              {(homeData.stats || []).map((stat: any, index: number) => (
                <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <label className="block text-xs font-medium mb-2">Value</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => {
                        const newStats = [...homeData.stats];
                        newStats[index] = {...newStats[index], value: e.target.value};
                        setHomeData({...homeData, stats: newStats});
                      }}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-2">Label</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const newStats = [...homeData.stats];
                        newStats[index] = {...newStats[index], label: e.target.value};
                        setHomeData({...homeData, stats: newStats});
                      }}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-2">Icons (Lucide)</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={stat.icon1}
                        onChange={(e) => {
                          const newStats = [...homeData.stats];
                          newStats[index] = {...newStats[index], icon1: e.target.value};
                          setHomeData({...homeData, stats: newStats});
                        }}
                        placeholder="Icon 1"
                        className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      />
                      <input
                        type="text"
                        value={stat.icon2}
                        onChange={(e) => {
                          const newStats = [...homeData.stats];
                          newStats[index] = {...newStats[index], icon2: e.target.value};
                          setHomeData({...homeData, stats: newStats});
                        }}
                        placeholder="Icon 2"
                        className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">e.g., Clock, TrendingUp</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Design Process Section */}
          <div className="bg-background border border-border rounded-lg p-6 mb-0">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Design Process (5 Steps)
            </h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Section Heading</label>
                <input
                  type="text"
                  value={homeData.process.heading}
                  onChange={(e) => setHomeData({...homeData, process: {...homeData.process, heading: e.target.value}})}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Section Description</label>
                <textarea
                  value={homeData.process.description}
                  onChange={(e) => setHomeData({...homeData, process: {...homeData.process, description: e.target.value}})}
                  rows={2}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>
            <div className="space-y-4">
              {(homeData.process?.steps || []).map((step: any, index: number) => (
                <div key={step.number} className="grid grid-cols-[60px,1fr,2fr] gap-4 p-4 bg-muted/30 rounded-lg">
                  <input
                    type="text"
                    value={step.number}
                    onChange={(e) => {
                      const newSteps = [...homeData.process.steps];
                      newSteps[index] = {...newSteps[index], number: e.target.value};
                      setHomeData({...homeData, process: {...homeData.process, steps: newSteps}});
                    }}
                    className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm text-center"
                  />
                  <input
                    type="text"
                    value={step.title}
                    onChange={(e) => {
                      const newSteps = [...homeData.process.steps];
                      newSteps[index] = {...newSteps[index], title: e.target.value};
                      setHomeData({...homeData, process: {...homeData.process, steps: newSteps}});
                    }}
                    className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                  <input
                    type="text"
                    value={step.desc}
                    onChange={(e) => {
                      const newSteps = [...homeData.process.steps];
                      newSteps[index] = {...newSteps[index], desc: e.target.value};
                      setHomeData({...homeData, process: {...homeData.process, steps: newSteps}});
                    }}
                    className="px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={saveHomeData}
              className="px-4 py-2 text-sm bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* PANEL 3: ORGANIZATIONS/INITIATIVES */}
        <div className="bg-background border-2 border-emerald-500/20 rounded-2xl p-8 shadow-sm">
          <div className="mb-6 pb-4 border-b-2 border-emerald-500/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="px-3 py-1 bg-emerald-500/10 rounded-full text-sm font-medium text-emerald-600">Panel 3</div>
              <h3 className="text-xl font-medium">Organizations & Initiatives</h3>
            </div>
            <p className="text-sm text-muted-foreground">Impact beyond design - community and cultural initiatives</p>
          </div>

          {/* Organizations/Initiatives Section */}
          <div className="bg-background border border-border rounded-lg p-6 mb-4">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Organizations & Initiatives (3 Tiles)
            </h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Section Heading</label>
                <input
                  type="text"
                  value={homeData.organizations.heading}
                  onChange={(e) => setHomeData({...homeData, organizations: {...homeData.organizations, heading: e.target.value}})}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Section Description</label>
                <textarea
                  value={homeData.organizations.description}
                  onChange={(e) => setHomeData({...homeData, organizations: {...homeData.organizations, description: e.target.value}})}
                  rows={2}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
            </div>
            <div className="space-y-6">
              {(homeData.organizations?.items || []).map((org: any, index: number) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg space-y-3 border-l-4 border-emerald-500">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-2">Organization Name</label>
                      <input
                        type="text"
                        value={org.name}
                        onChange={(e) => {
                          const newItems = [...homeData.organizations.items];
                          newItems[index] = {...newItems[index], name: e.target.value};
                          setHomeData({...homeData, organizations: {...homeData.organizations, items: newItems}});
                        }}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-2">Tag</label>
                      <input
                        type="text"
                        value={org.tag}
                        onChange={(e) => {
                          const newItems = [...homeData.organizations.items];
                          newItems[index] = {...newItems[index], tag: e.target.value};
                          setHomeData({...homeData, organizations: {...homeData.organizations, items: newItems}});
                        }}
                        className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-2">Icon/Logo URL</label>
                    <input
                      type="text"
                      value={org.icon}
                      onChange={(e) => {
                        const newItems = [...homeData.organizations.items];
                        newItems[index] = {...newItems[index], icon: e.target.value};
                        setHomeData({...homeData, organizations: {...homeData.organizations, items: newItems}});
                      }}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    <p className="text-xs text-muted-foreground mt-1">SVG: ../../imports/file.svg or figma:asset/hash.png</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-2">Description</label>
                    <textarea
                      value={org.desc}
                      onChange={(e) => {
                        const newItems = [...homeData.organizations.items];
                        newItems[index] = {...newItems[index], desc: e.target.value};
                        setHomeData({...homeData, organizations: {...homeData.organizations, items: newItems}});
                      }}
                      rows={2}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={saveHomeData}
              className="px-4 py-2 text-sm bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* PANEL 4: ABOUT/CONTACT PREVIEW */}
        <div className="bg-gradient-to-b from-muted/30 to-background border-2 border-blue-500/20 rounded-2xl p-8 shadow-sm">
          <div className="mb-6 pb-4 border-b-2 border-blue-500/20">
            <div className="flex items-center gap-3 mb-2">
              <div className="px-3 py-1 bg-blue-500/10 rounded-full text-sm font-medium text-blue-600">Panel 4</div>
              <h3 className="text-xl font-medium">About & Contact Preview</h3>
            </div>
            <p className="text-sm text-muted-foreground">Quick intro section and contact form at bottom of home page</p>
          </div>

          <div className="bg-background border border-border rounded-lg p-6 mb-4">
            <h3 className="font-medium mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              About Section
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Heading</label>
                <input
                  type="text"
                  value={homeData.about.heading}
                  onChange={(e) => setHomeData({...homeData, about: {...homeData.about, heading: e.target.value}})}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Introduction</label>
                <textarea
                  value={homeData.about.intro}
                  onChange={(e) => setHomeData({...homeData, about: {...homeData.about, intro: e.target.value}})}
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Specialization</label>
                <textarea
                  value={homeData.about.specialization}
                  onChange={(e) => setHomeData({...homeData, about: {...homeData.about, specialization: e.target.value}})}
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Approach</label>
                <textarea
                  value={homeData.about.approach}
                  onChange={(e) => setHomeData({...homeData, about: {...homeData.about, approach: e.target.value}})}
                  rows={3}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Link Text</label>
                  <input
                    type="text"
                    value={homeData.about.linkText}
                    onChange={(e) => setHomeData({...homeData, about: {...homeData.about, linkText: e.target.value}})}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={homeData.about.email}
                    onChange={(e) => setHomeData({...homeData, about: {...homeData.about, email: e.target.value}})}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
                <input
                  type="url"
                  value={homeData.about.linkedin}
                  onChange={(e) => setHomeData({...homeData, about: {...homeData.about, linkedin: e.target.value}})}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="font-medium mb-4">Contact Form Section</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Section Heading</label>
                <input
                  type="text"
                  value={homeData.contact.heading}
                  onChange={(e) => setHomeData({...homeData, contact: {...homeData.contact, heading: e.target.value}})}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={homeData.contact.description}
                  onChange={(e) => setHomeData({...homeData, contact: {...homeData.contact, description: e.target.value}})}
                  rows={2}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Button Text</label>
                  <input
                    type="text"
                    value={homeData.contact.buttonText}
                    onChange={(e) => setHomeData({...homeData, contact: {...homeData.contact, buttonText: e.target.value}})}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Success Message</label>
                  <input
                    type="text"
                    value={homeData.contact.successMessage}
                    onChange={(e) => setHomeData({...homeData, contact: {...homeData.contact, successMessage: e.target.value}})}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={saveHomeData}
              className="px-4 py-2 text-sm bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Global Save Button */}
        <div className="flex justify-center">
          <button
            onClick={saveHomeData}
            className="px-8 py-4 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors text-lg font-medium shadow-lg"
          >
            Save All Home Page Changes
          </button>
        </div>
      </div>
    </motion.div>
  );
}
