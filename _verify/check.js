const { JSDOM, VirtualConsole } = require("jsdom");
const BASE = "http://127.0.0.1:8765/";
const pages = ["index.html", "about.html", "projects.html", "contact.html"];
let bad = 0;

(async () => {
  for (const page of pages) {
    const errors = [];
    const vc = new VirtualConsole();
    vc.on("jsdomError", (e) => { if (!/Not implemented: navigation/i.test(e.message)) errors.push(e.message); });
    vc.on("error", (...a) => errors.push(a.join(" ")));

    const dom = await JSDOM.fromURL(BASE + page, {
      runScripts: "dangerously", resources: "usable", pretendToBeVisual: true, virtualConsole: vc,
      beforeParse(w) { w.scrollTo = () => {}; }
    });
    await new Promise((r) => setTimeout(r, 2200));
    const d = dom.window.document;
    const txt = d.body.textContent.replace(/\s+/g, " ");

    const urdu = /(Dekhein|Karein|Mere |Meri |aap|nahi|hain|mein |karein|banwana|Rabta|Usool|Safar|Saare|Poochhe|Bhejein|baare)/i.test(txt);

    console.log(`${page.padEnd(15)} nav:${d.querySelectorAll(".navbar").length} foot:${d.querySelectorAll("footer").length} ` +
      `proj:${d.querySelectorAll(".project-card").length} skills:${d.querySelectorAll(".skill-group").length} ` +
      `urdu-left:${urdu} errors:${errors.length}`);
    if (urdu) { console.log("   URDU SAMPLE:", txt.match(/.{0,60}(Dekhein|Karein|Mere |aap|nahi|hain|banwana|Rabta|Usool|Safar|Saare|Bhejein|baare).{0,60}/i)); bad++; }
    if (errors.length) { console.log("   ERRORS:", errors); bad++; }
    dom.window.close();
  }
  console.log(bad === 0 ? "\nALL CLEAN ✅" : `\nISSUES: ${bad} ❌`);
})();
