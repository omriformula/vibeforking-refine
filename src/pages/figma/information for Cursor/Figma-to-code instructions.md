I am currently building a new application that would allow digital product companies with existing code base and Figma designs to upload their current application to my app and from that point on to vibe-code on their existing application’s screens.

From the users we’ve been talking to, which were mainly Product Managers (PMs), we’ve heard repeatedly their desire to have an application that would allow them to quickly iterate and prototype live working experiences and features on top of their existing application so they could expedite the ideation & validation process.

Their current working process today is:

1. PMs see their product usage data and come up with theories into what would they need to build and ship for their users to become happy paying users.  
2. PMs look into their current application and analyze current user flows, while researching competitors & alternatives, as well as other digital experiences. This research is helping them to think of new features and experiences and changes that might be good for their business.  
3. With the conclusions of step 2, PMs then goes to the Product Designer and tries to sync them with all the business information and hypotheses from step 1 and 2, and ask them to design new features and redesign current app screens and flows to help the PMs to prototype these ideas. This step takes a lot of time, days or even weeks, just to get a new prototype and usually requires many iterations between the PMs and the Product Designer.  
4. After few weeks of iterations, PMs are presenting to inner business stakeholders the new prototype (they present Figma static designs), to gather feedback, go back to iterate with the Product Designer while processing the new feedback into a new prototype.  
5. With the revised prototype, PMs now want to build a way to test this new prototype with actual users, to see if they can get an indication that indeed what they designed will be impactful from users’ perspective. This is mainly important because PMs job is to strategically use software engineers only on features and designs with the highest likelihood to be impactful for users, because developers time is the most expensive and limited resource in most companies. So what PMs want to do now is create the cheapest way to experiment the new prototype with users, either by doing alpha/beta release, or A/B testing. So they would ask developers to build an MVP, and would hope the devs would understand the nuances of what tech-debt is okay to take, based on the fact that this prototype might not be moving to production, it is just important to build the bare minimum just to test business potential and we can spend time building it ‘right’ only if potential is proven.  
6. After few weeks of building and iterating with dev, prototype is being tested.

This entire process, of understanding what to build next is taking several weeks, just to release a test.

What our product will give them, is a dramatic alternative that would take this entire process, which requires PMs, designers & devs several weeks of time, and would reduce it to having the PM be able to release a working prototype, in just couple of hours. This is dramatically changes everything for product companies.

To do that, what we would like to build as an MVP for our users (PMs), is an application that would allow them to vibe code new features, designs and flows on top of their existing products.

For the MVP, the flow would be as follows:  
1\. Users upload their existing application screens, by connecting their Figma to the application.  
2\. The application uses Figma APIs (https://www.figma.com/developers/api\#files-endpoints) to retrieve the data, and recreates a dynamic code that represents each screen from that Figma, with the different UI components separated, so it can be vibe-coded separately by the user later on.   
3\. The user can vibe-code each screen and alter it as it wishes. 

I am writing here after many attempts of building it, using Claude Sonnet and GPT4 Vision, but step 2 is keeping getting it wrong. The 2nd step, which is to recreate a dynamic code that represents each screen from that Figma, with the different UI components separated, so it can be vibe-coded separately by the user later on, is simply not working yet.

There are few challenges I’ve noticed by now which are:  
1\. Figma API is returning a JSON file that is very hard to map into UI components (what is a button? Some designers would build it in Figma as a Frame with a color and a text, some would build a Frame with auto-layout and would have a rectangle within it, etc..).  
2\. Every designer could design the same screen differently, but our application would need to have the same generated code output for each designer’s Figma usage.  
3\. The generated code should be ready to be vibe-coded upon, while also help the app the get the general styling and design language, based on the existing screens.

I found an external tool that translates Figma to code perfectly, I could download the perfectly generated code (desired output) along with the FIGMA API response (input), for several screens, along with a screenshot of that screen for you to see. Would that be helpful for you to help me generate a script that does exactly (100% exactly) what they did? Don't try to satisfy me, be thoughtful. You are a senior developer that is responsible for this logic, take as long as you need.