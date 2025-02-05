# **JJN-INFO: CV-ESTIMATOR**  

## **WTF is this?**  

This is my **CV parser & salary guesser**. Give it a PDF (or a DOC file if I ever get around to adding support), and it will:  

1. **Read the whole thing** – ignoring all the fancy formatting.  
2. **Send it to OpenAI** – like a lazy recruiter pretending to care.  
3. **Ask for a salary estimate** – because apparently, LLMs are better at this than HR.  
4. **Print the result** – so I can roll my eyes at how over/underpaid someone is.  

---

## **Folder Structure (What Past Me Set Up, What Future Me Needs to Remember)**  

```plaintext
cv-estimator/
├── README.md         # Lies about how simple this is.
├── app.js           # The nerve centre of this salary-guessing machine.
├── fileReader.js    # Extracts text from CVs. No, it won’t fix typos.
├── openaiService.js # Talks to OpenAI. Tries to sound professional.
├── package.json     # Proof that this is "enterprise-ready".
├── prompt/          # Empty folder. Looks important.
├── run.sh          # If you like running things the UNIX way.
└── package-lock.json # Nobody actually reads this.
```

---

## **How I Run This (Because I’ll Forget)**  

### **Step 1: Install the Stuff**  

This runs on **Node.js** (or Bun, because I'm fancy like that).  

```bash
npm install  # or bun install
```

Then, make sure I have a `.env` file with my OpenAI API key:  

```plaintext
OPENAI_API_KEY=sk-...
```

---

### **Step 2: Actually Use It**  

Run it like a peasant:  

```bash
node app.js
```

Or like someone who knows better:  

```bash
bun run app.js
```

It will then ask for a **file path**. I **CANNOT** forget that the path needs to be correct, or this thing will **whine like a toddler.**  

💡 **Example input:**  
```plaintext
Enter the file path: ~/Documents/Resume.pdf
```

---

## **Breakdown of How This Works (Because I Will Forget in 6 Months)**  

### **`app.js` (The Ringleader)**  
- Asks me for a file path.  
- Calls `fileReader.js` to extract text.  
- Ships text off to OpenAI using `openaiService.js`.  
- Prints **whatever OpenAI thinks the salary should be.**  

---

### **`openaiService.js` (The HR Intern)**  
- Calls OpenAI’s **GPT-3.5-Turbo** (because GPT-4 is expensive).  
- Gives it a **half-professional prompt** to estimate salary.  
- Returns **the AI’s best guess.**  

---

### **`fileReader.js` (The PDF Whisperer)**  
- Reads PDFs using `pdf-parse`.  
- Converts everything to raw text.  
- **DOES NOT** care about images, formatting, or tables.  
- **Does not** work with DOC files yet. **(Future Me, fix this.)**  

---

## **Notes to Self (A.K.A. What I Need to Fix Eventually)**  

🚀 **Support DOCX files.**  
🚀 **Handle garbage input better.**  
🚀 **Make the output fancier (colours, better formatting, etc.).**  
🚀 **Add a "WTF is this salary?" reaction generator.**  

---

## **What Future Me Needs to Remember**  

- **This project is basic but functional.**  
- **The AI guesses salaries based on whatever nonsense is in the CV.**  
- **If it breaks, it’s probably because of a bad file path, missing API key, or OpenAI changing something.**  
- **It was funny at first, but if I ever have to use this in a real situation… I should probably rethink my life choices.**  

---

## **Final Words to Future Me**  

You built this for **fun**. If you’re debugging it now, you either:  
1️⃣ Actually need this tool seriously (which is **terrifying**), or  
2️⃣ Got bored and decided to break things again.  

Good luck.