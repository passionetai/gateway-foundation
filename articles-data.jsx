/* global React */
/*
 * Article content + reusable block helpers.
 * Exports ARTICLES (array) and the helpers on window so list and single-article views can use them.
 */

const Pullquote = ({ children }) => (
  <blockquote className="article-pullquote">
    {children}
  </blockquote>
);

const SectionHead = ({ children }) => (
  <h3 className="article-h3">{children}</h3>
);

const P = ({ children }) => <p className="article-p">{children}</p>;

const ARTICLES = [
  {
    slug: "talking-to-teens",
    title: "Talking to teens about substances \u2014 without losing them.",
    excerpt: "What we've learned from nine months of prevention sessions in Lagos secondary schools \u2014 and why the standard \u201Cjust say no\u201D conversation now does more harm than good.",
    badge: "Featured \u00B7 Prevention",
    badgeTone: "green",
    readTime: "7 min read",
    date: "18 Apr 2026",
    dateRaw: "2026-04-18",
    tags: ["Parenting", "Prevention", "Youth"],
    author: { initials: "CE", name: "Ambassador Reverend Chukwudi Eke", role: "Founder & counsellor", tone: "green" },
    Body: () => (
      <>
        <Pullquote>
          Most parents wait until they smell something. By then, the conversation is already late \u2014 and rarely the right one.
        </Pullquote>
        <P>
          In the nine months we&rsquo;ve run prevention sessions in Lagos secondary schools, one
          pattern keeps repeating. Students aren&rsquo;t short on information. They know what cannabis
          is, what tramadol does, what codeine syrup feels like the first time. What they&rsquo;re short
          on is honest adults willing to talk about it without panic.
        </P>
        <P>
          The conversation parents are taught to have \u2014 the &ldquo;just say no&rdquo; conversation \u2014
          collapses on contact with reality. Teens see through it. They&rsquo;ve already heard friends
          describe what these substances actually do, and the gap between that and the panic
          narrative tells them, accurately, that the adult talking to them has not been honest.
        </P>
        <SectionHead>What we tell parents instead</SectionHead>
        <P>
          Three things, in this order. First: acknowledge that the substance has effects people seek
          out. Pretending it doesn&rsquo;t is the fastest way to lose your credibility with a 15-year-old.
          Second: name the specific costs \u2014 not generic warnings, but what we&rsquo;ve seen in our
          recovery circles. The boy who can&rsquo;t concentrate for his WAEC. The girl who lost two years
          to a habit that started at a birthday party. Third: leave the door open. Make it clear that
          if the conversation needs to come back, it can.
        </P>
        <P>
          This isn&rsquo;t soft. It&rsquo;s the opposite. Soft is the conversation that lets the teenager
          nod, agree, and walk out knowing they&rsquo;ll never bring it up again. Hard is the
          conversation where they say something real and you don&rsquo;t flinch.
        </P>
        <SectionHead>Why this matters now</SectionHead>
        <P>
          Substance use among Nigerian youth has shifted in the last five years. The drugs are
          cheaper, more available, and increasingly marketed through social channels parents
          don&rsquo;t monitor. The window between curiosity and dependence is shorter than it used to
          be. Prevention conversations that worked on previous generations no longer carry the same
          weight.
        </P>
        <Pullquote>
          The families who keep their children out of our recovery programs are not the ones with the strictest rules. They&rsquo;re the ones where the conversation stayed open.
        </Pullquote>
        <P>
          What we&rsquo;ve found is that the families who keep their children out of our recovery
          programs are not the ones with the strictest rules. They&rsquo;re the ones where the
          conversation stayed open \u2014 where, when something went wrong, the teenager came home
          and said so before it got worse.
        </P>
        <P>
          That&rsquo;s the gateway we want every family to build. Not a wall. A door that opens both ways.
        </P>
      </>
    )
  },

  {
    slug: "trafficking-recruiters-online",
    title: "How trafficking recruiters operate online \u2014 and what to watch for.",
    excerpt: "The patterns are predictable once you know what you&rsquo;re looking at. We&rsquo;ve broken down the recruitment funnel \u2014 from initial DM to false job offer \u2014 based on testimony from our safe-house alumni and case files from NAPTIP.",
    badge: "Advocacy \u00B7 Trafficking",
    badgeTone: "clay",
    readTime: "9 min read",
    date: "2 Apr 2026",
    dateRaw: "2026-04-02",
    tags: ["Trafficking", "Online safety", "Advocacy"],
    author: { initials: "JA", name: "Engr. Jerry Asemota", role: "Director of operations", tone: "clay" },
    Body: () => (
      <>
        <Pullquote>
          By the time a family realises their daughter has been recruited, the conversation has usually moved off the platform that started it.
        </Pullquote>
        <P>
          Over the last year we&rsquo;ve worked with NAPTIP and our own safe-house alumni to map how
          trafficking recruitment actually unfolds online. The good news: it&rsquo;s not magic, and it
          isn&rsquo;t random. The recruiters follow a recognisable funnel. The bad news: most parents,
          and most teenagers, can&rsquo;t spot it until they&rsquo;re already inside it.
        </P>
        <SectionHead>Stage one: the friendly entry</SectionHead>
        <P>
          It almost always starts on a public platform \u2014 Instagram, TikTok, occasionally Facebook
          for older targets. The first message is warm, complimentary, and entirely non-sexual.
          &ldquo;You have a beautiful smile.&rdquo; &ldquo;Your hair looks really nice in that photo.&rdquo;
          Recruiters are trained to be patient. Many wait a week between the first message and the
          second.
        </P>
        <SectionHead>Stage two: the move off-platform</SectionHead>
        <P>
          Within two to three weeks, the conversation shifts to WhatsApp or Telegram. The framing
          is always casual \u2014 &ldquo;Instagram keeps logging me out&rdquo;, &ldquo;easier to send
          voice notes&rdquo; \u2014 but the effect is to step outside any platform-level moderation. From
          here, the relationship deepens fast.
        </P>
        <SectionHead>Stage three: the offer</SectionHead>
        <P>
          The offer is rarely the trafficking itself. It&rsquo;s an opportunity that sounds adjacent
          to one \u2014 a modelling job in Lagos, a cleaning role in Italy, a hospitality posting in
          the Gulf. The terms are vague, the pay sounds generous, and the timeline is fast. Travel
          documents are &ldquo;handled.&rdquo; A small advance is sometimes paid to family members to
          confirm intent.
        </P>
        <Pullquote>
          Every survivor we&rsquo;ve interviewed described the moment they knew something was wrong \u2014 and every one of them said they could not undo the decision they&rsquo;d already made.
        </Pullquote>
        <SectionHead>What to watch for</SectionHead>
        <P>
          Three signs, in our case files, predict trafficking recruitment with depressing reliability.
          A new online &ldquo;mentor&rdquo; whose interest escalates quickly. Sudden interest in foreign
          job postings the person can&rsquo;t explain how they heard about. Travel arrangements being
          coordinated by someone the family has never met or vetted.
        </P>
        <P>
          If any of those patterns is present, get someone trained on the conversation. NAPTIP runs a
          confidential helpline. We do too. Both lines are listed at the bottom of every page on this
          site.
        </P>
      </>
    )
  },

  {
    slug: "recovery-month-six",
    title: "What recovery actually looks like at month six.",
    excerpt: "Recovery is not a finish line. It&rsquo;s a series of unglamorous Tuesdays. Our counsellors walk through what the middle of the journey actually feels like \u2014 for the person, the family, and the support network around them.",
    badge: "Stories \u00B7 Recovery",
    badgeTone: "green",
    readTime: "6 min read",
    date: "22 Mar 2026",
    dateRaw: "2026-03-22",
    tags: ["Recovery", "Stories", "Family"],
    author: { initials: "EI", name: "Mr. Ejike Ibe", role: "Director of outreach", tone: "green" },
    Body: () => (
      <>
        <Pullquote>
          Months one through three are loud. Months four through six are quiet. The quiet is where most people stop showing up.
        </Pullquote>
        <P>
          When someone leaves residential rehab, the dramatic part is over. The withdrawal is done.
          The crisis has passed. Friends and family who showed up in the first thirty days have
          mostly gone back to their own lives. The work that remains is real, but it doesn&rsquo;t
          photograph well.
        </P>
        <SectionHead>What the middle actually feels like</SectionHead>
        <P>
          Boredom. A surprising amount of boredom. The person in recovery has lost the rhythm of
          their old days \u2014 the people, the meeting spots, the time-killing rituals that lived
          around using \u2014 and the new rhythm is still being built. Hours that used to be filled
          are suddenly empty. Without intervention, that emptiness is the single biggest predictor
          of relapse.
        </P>
        <P>
          Anhedonia. The brain is still recalibrating its reward system. Things that should feel
          good \u2014 a meal with family, a good film, a compliment from a friend \u2014 land with
          half their old weight. People often describe month four as &ldquo;feeling fine but not feeling much.&rdquo;
        </P>
        <SectionHead>What helps</SectionHead>
        <P>
          A structured schedule with non-negotiables. Three appointments a week is our floor:
          a counsellor, a peer group, a physical activity. We don&rsquo;t care which order; we care
          that they happen.
        </P>
        <P>
          A second relationship. Someone, ideally not a family member, whom the person texts before
          they buy. We help build that match in our recovery circles. The relationship is more
          important than its content \u2014 it just needs to be one a person doesn&rsquo;t want to lose.
        </P>
        <P>
          And, for the family: a recalibration of expectations. Month six is not month twelve. The
          person you are getting back is still under construction. Patience now compounds. Pressure
          now backfires.
        </P>
      </>
    )
  },

  {
    slug: "dignity-before-discipline",
    title: "Why dignity comes before discipline in every intervention.",
    excerpt: "The fastest way to lose a person we&rsquo;re trying to help is to treat them like a case before treating them like a human. Our founder unpacks the principle behind every program decision we make.",
    badge: "Philosophy \u00B7 Method",
    badgeTone: "green",
    readTime: "5 min read",
    date: "8 Mar 2026",
    dateRaw: "2026-03-08",
    tags: ["Method", "Values", "Practice"],
    author: { initials: "CE", name: "Ambassador Reverend Chukwudi Eke", role: "Founder", tone: "green" },
    Body: () => (
      <>
        <Pullquote>
          The moment we make someone feel like a problem to be solved, we have already lost them.
        </Pullquote>
        <P>
          Every intervention we run \u2014 whether for someone in addiction, a survivor of trafficking,
          or a family in crisis \u2014 starts with the same instruction to our staff. Greet them by
          name. Sit at their level. Do not lead with paperwork. The intake form can wait.
        </P>
        <P>
          This isn&rsquo;t sentimental. It&rsquo;s tactical. The people who walk through our door have
          already been spoken about, written about, and processed by half a dozen systems before they
          reach us. Many have been touched without consent, photographed without dignity, and
          questioned in rooms where the lights were too bright. Adding one more institutional
          experience to that list is the surest way to lose them.
        </P>
        <SectionHead>What this looks like in practice</SectionHead>
        <P>
          We do not require an intake form for an initial conversation. We do not record names in the
          first session. We do not photograph anyone without explicit, separated, written consent \u2014
          and we do not use those photographs in fundraising appeals even when consent has been given.
        </P>
        <P>
          We have lost grants over this. Some donors want before-and-after stories with faces and
          first names. They argue, reasonably, that it makes the case for support harder to ignore.
          Our position is that the cost of those stories \u2014 to the dignity of the person whose
          story it is \u2014 outweighs the marginal donation they unlock.
        </P>
        <Pullquote>
          A person&rsquo;s story belongs to them. Our job is to help them rewrite it, not to circulate the old draft.
        </Pullquote>
        <SectionHead>Where this comes from</SectionHead>
        <P>
          Personally, from a brother I could not save in time. Structurally, from twenty years of
          watching well-meaning programs fail people they intended to help \u2014 because the people
          themselves were never the centre of the design.
        </P>
        <P>
          Dignity comes first because it works. Discipline, structure, accountability \u2014 those
          come next, and they come faster, in a relationship where the person has already been treated
          as a person. Out of order, none of it lands.
        </P>
      </>
    )
  }
];

Object.assign(window, { ARTICLES, Pullquote, SectionHead, P });
