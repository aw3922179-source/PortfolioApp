# -*- coding: utf-8 -*-
"""Convert all Roman Urdu UI strings on the site to pure English."""
import io, os, sys

BASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "portfolio")

R = {
  "js/main.js": [
    ('"Mere Projects Dekhein \u2192"', '"View My Projects \u2192"'),
    ('"Rabta Karein"', '"Get In Touch"'),
    ('"Poori Kahani Padhein \u2192"', '"Read The Full Story \u2192"'),
    ('Systems banata hun, <span class="gradient-text">sirf pages nahi</span>',
     'I build systems, <span class="gradient-text">not just pages</span>'),
    ('"\u27f3 GitHub stats load ho rahe hain\u2026"', '"\u27f3 Loading GitHub stats\u2026"'),
    ('>Details Dekhein<', '>View Details<'),
    ('>Source Code Dekhein \u2197<', '>View Source Code \u2197<'),
    ('>Band Karein<', '>Close<'),
    ('`<option value="">-- Select karein --</option>`', '`<option value="">-- Select an option --</option>`'),
    ('"Kam az kam 2 harf ka naam likhein"', '"Please enter at least 2 characters"'),
    ('"Sahi email address likhein"', '"Please enter a valid email address"'),
    ('"Subject select karein"', '"Please select a subject"'),
    ('"Kam az kam 10 harf ka message likhein"', '"Please write at least 10 characters"'),
    ('"Form mein kuch ghaltiyan hain"', '"Please fix the highlighted fields"'),
    ('`\u2705 Shukriya ${name}! Aap ka email client khul raha hai \u2014 message bhej dein. Ya seedha ${PROFILE.email} par likh dein.`',
     '`\u2705 Thank you ${name}! Your email client is opening \u2014 just press send. You can also write to ${PROFILE.email} directly.`'),
    ('"Copy nahi ho saka \u2014 manually copy karein"', '"Could not copy \u2014 please copy it manually"'),
    ('"\U0001f4cb Copy ho gaya: "', '"\U0001f4cb Copied: "'),
    ('<h2>Koi project banwana hai?</h2>', '<h2>Have a project in mind?</h2>'),
    ('Agar aap ke paas koi idea hai \u2014 chhota ya bara \u2014 mujhe batayein. Main usay ek chalne wali web application mein badal sakta hun.',
     'If you have an idea \u2014 small or large \u2014 tell me about it. I can turn it into a working web application.'),
    ('>Baat Karein \u2192<', '>Start a Conversation \u2192<'),
  ],

  "index.html": [
    ('content="Abdul Wasay Ali \u2014 Full-Stack Web Developer. PHP, MySQL aur JavaScript ke saath complete web applications. Projects: Courier Management System, Wings of Wisdom, JS Calculator."',
     'content="Abdul Wasay Ali \u2014 Full-Stack Web Developer. Complete web applications built with PHP, MySQL and JavaScript. Projects: Courier Management System, Wings of Wisdom, JS Calculator."'),
    ('content="Complete web applications \u2014 PHP, MySQL, JavaScript aur responsive UI."',
     'content="Complete web applications \u2014 PHP, MySQL, JavaScript and responsive UI."'),
    ('<h2>Meri <span class="gradient-text">Technical Toolkit</span></h2>',
     '<h2>My <span class="gradient-text">Technical Toolkit</span></h2>'),
    ('<p>Frontend se lekar database tak \u2014 woh saare tools jo main rozana istemaal karta hun.</p>',
     '<p>From the frontend to the database \u2014 the tools I work with every single day.</p>'),
    ('<h2>Mere <span class="gradient-text">Featured Projects</span></h2>',
     '<h2>My <span class="gradient-text">Featured Projects</span></h2>'),
    ('<p>Ye projects mere GitHub par live hain \u2014 code bhi dekhein, details bhi.</p>',
     '<p>These projects are live on my GitHub \u2014 browse the code and the details.</p>'),
    ('>Saare Projects Dekhein \u2192<', '>View All Projects \u2192<'),
    ('<h2>Main Kya <span class="gradient-text">Bana Sakta Hun</span></h2>',
     '<h2>What I <span class="gradient-text">Can Build</span></h2>'),
    ('<p>Idea se lekar deployment tak \u2014 poori web application.</p>',
     '<p>From the first idea to deployment \u2014 a complete web application.</p>'),
    ('<h2>Mere <span class="gradient-text">Usool</span></h2>',
     '<h2>My <span class="gradient-text">Principles</span></h2>'),
  ],

  "about.html": [
    ('content="Abdul Wasay Ali ke baare mein \u2014 full-stack web developer, PHP aur MySQL specialist, aur uski learning journey."',
     'content="About Abdul Wasay Ali \u2014 full-stack web developer, PHP and MySQL specialist, and his learning journey."'),
    ('<h1 class="reveal">Mere <span class="gradient-text">Baare Mein</span></h1>',
     '<h1 class="reveal">About <span class="gradient-text">Me</span></h1>'),
    ('<p class="reveal">Ek developer jo systems banana pasand karta hai \u2014 sirf pages nahi.</p>',
     '<p class="reveal">A developer who enjoys building systems \u2014 not just pages.</p>'),
    ('<h2>Mera <span class="gradient-text">Safar</span></h2>',
     '<h2>My <span class="gradient-text">Journey</span></h2>'),
    ('<p>Frontend fundamentals se lekar full-stack engineering tak \u2014 step by step.</p>',
     '<p>From frontend fundamentals to full-stack engineering \u2014 step by step.</p>'),
    ('>Projects Dekhein \u2192<', '>View Projects \u2192<'),
    ('<h2>Mere <span class="gradient-text">Usool</span></h2>',
     '<h2>My <span class="gradient-text">Principles</span></h2>'),
  ],

  "projects.html": [
    ('content="Abdul Wasay Ali ke projects \u2014 Courier Management System (PHP/MySQL), Wings of Wisdom (JavaScript) aur JS Calculator."',
     'content="Projects by Abdul Wasay Ali \u2014 Courier Management System (PHP/MySQL), Wings of Wisdom (JavaScript) and the JS Calculator."'),
    ('<h1 class="reveal">Mere <span class="gradient-text">Projects</span></h1>',
     '<h1 class="reveal">My <span class="gradient-text">Projects</span></h1>'),
    ('Teen projects, teen alag levels \u2014 core JavaScript logic se lekar ek mukammal\n          multi-role PHP aur MySQL platform tak. Har project ka source code GitHub par live hai.',
     'Three projects at three different levels \u2014 from core JavaScript logic all the way\n          to a complete multi-role PHP and MySQL platform. The source code for every project is live on GitHub.'),
    ('>Saare</button>', '>All</button>'),
    ('<h2>In Projects Mein Kya <span class="gradient-text">Shamil Hai</span></h2>',
     '<h2>What These Projects <span class="gradient-text">Include</span></h2>'),
    ('>Saara Code GitHub Par<', '>All The Code Is On GitHub<'),
    ('@aw3922179-source \u2014 repositories, commits aur updates.', '@aw3922179-source \u2014 repositories, commits and updates.'),
  ],

  "contact.html": [
    ('content="Abdul Wasay Ali se rabta karein \u2014 aw3922179@gmail.com, 03110269718."',
     'content="Get in touch with Abdul Wasay Ali \u2014 aw3922179@gmail.com, 03110269718."'),
    ('<h1 class="reveal">Rabta <span class="gradient-text">Karein</span></h1>',
     '<h1 class="reveal">Get In <span class="gradient-text">Touch</span></h1>'),
    ('Koi project, sawal ya sirf salam \u2014 neeche diya gaya form bharein ya seedha\n          call / email karein. Main 24 ghante ke andar jawab deta hun.',
     'Whether it is a project, a question or just a hello \u2014 fill in the form below or\n          simply call or email me. I reply within 24 hours.'),
    ('Freelance projects ke liye available', 'Available for freelance projects'),
    ('>Mujhe Message Bhejein<', '>Send Me a Message<'),
    ('Form bharein \u2014 aap ka email client khul jayega aur message ready hoga.',
     'Fill in the form \u2014 your email client will open with the message ready to send.'),
    ('>Aap ka Naam *<', '>Your Name *<'),
    ('placeholder="Misaal: Ahmed Khan"', 'placeholder="e.g. Ahmed Khan"'),
    ('placeholder="Apne project ya sawal ke baare mein tafseel se likhein\u2026"',
     'placeholder="Tell me about your project or question in detail\u2026"'),
    ('>Message Bhejein \u2192<', '>Send Message \u2192<'),
    ('>Email Copy Karein<', '>Copy Email<'),
    ('<h2>Aksar Poochhe Jane Wale <span class="gradient-text">Sawal</span></h2>',
     '<h2>Frequently Asked <span class="gradient-text">Questions</span></h2>'),
    ('<h4>Jawab mein kitna waqt lagta hai?</h4>', '<h4>How quickly do you reply?</h4>'),
    ('<p>Aam tor par 24 ghante ke andar. WhatsApp par aksar usi waqt.</p>',
     '<p>Usually within 24 hours. On WhatsApp, often right away.</p>'),
    ('<h4>Kis tarah ke projects lete hain?</h4>', '<h4>What kind of projects do you take on?</h4>'),
    ('<p>PHP aur MySQL web applications, management systems, dashboards aur responsive frontends.</p>',
     '<p>PHP and MySQL web applications, management systems, dashboards and responsive frontends.</p>'),
    ('<h4>Kya aap website deploy bhi karte hain?</h4>', '<h4>Do you handle deployment as well?</h4>'),
    ('<p>Ji haan \u2014 database setup, hosting configuration aur deployment tak ka kaam.</p>',
     '<p>Yes \u2014 from database setup and hosting configuration all the way to deployment.</p>'),
    ('<h4>Purani website theek kar sakte hain?</h4>', '<h4>Can you fix an existing website?</h4>'),
    ('<p>Ji haan \u2014 bugs fix karna, design improve karna aur features add karna.</p>',
     '<p>Yes \u2014 fixing bugs, improving the design and adding new features.</p>'),
  ],
}

total = 0
missing = []
for fname, pairs in R.items():
    path = os.path.join(BASE, fname)
    src = io.open(path, encoding="utf-8").read()
    for old, new in pairs:
        if old not in src:
            missing.append((fname, old[:70]))
            continue
        src = src.replace(old, new)
        total += 1
    io.open(path, "w", encoding="utf-8").write(src)

print("replacements applied:", total)
if missing:
    print("!! NOT FOUND:")
    for f, o in missing:
        print("  ", f, "|", o)
else:
    print("all patterns matched")
