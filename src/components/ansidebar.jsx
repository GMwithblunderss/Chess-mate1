import React, { useEffect, useState } from "react";

const Ansidebar = ({ handlecount,onIncrease, onDecrease, onReset, movelist, pgn,counting,display ,onflip ,showtactic ,pvtrying ,booknames}) => {
 const myarray = movelist.slice(0, counting);
 const [opening,setopening] = useState("");


 useEffect( () =>
{

  
 const getopening = () =>
 {
    const ecoUrlMatch = pgn.match(/\[ECOUrl\s+"([^"]+)"\]/);
    if (ecoUrlMatch) {
        const url = ecoUrlMatch[1];
        const openingPart = url.split('/openings/')[1];
        if (openingPart) {
            let name = openingPart
                .split('-')
                .slice(0, 6) 
                .join(' ')
                .replace(/\d+.*$/, '') 
                .replace(/\.\.\.$/, '') 
                .trim();
            
            if (name && name.length > 3) {
                
                setopening(name);
            }
        }
    } else {
  setopening(booknames[booknames.length-1]);
}
 }
 getopening();
},[pgn ,counting ,booknames] );



//console.log("counting",counting );
//console.log("booknames",booknames);

    useEffect(() => {
        const handleKeyDown = (e) => {
          if (pvtrying ) return;
            if (e.key === "ArrowRight") {
                onIncrease();
                e.preventDefault();
            } else if (e.key === "ArrowLeft") {
              e.preventDefault();
                onDecrease();
            }
            else if (e.key=== "Escape")
            {
              onReset();
              e.preventDefault();
            }
        };
      

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onIncrease, onDecrease]);
  


  return (
    <div style={{...styles.sidebar ,display}}>
      
      <div style={styles.moveBox}>
      
        <h3 style={styles.moveTitle}>Move Log </h3>
        <h4>{opening}</h4>
       <div style={{display:"flex", gap :"10px", flexWrap:"wrap"}}>
  {movelist.map((m, index) => (
    <button
      key={index}
      style={{
        ...styles.btn,
        backgroundColor: index === counting- 1? "#ffe5d9" : "transparent", 
        fontWeight: index === counting -1 ? "bold" : "normal",
      }}
      onClick={() => {
        if (typeof handlecount === "function") handlecount(index);
        else console.error("handlecount is not a function", handlecount);
      }}
    >
      {m}
    </button>
  ))}
</div>
        <div style={styles.moveContent}>
          
        </div>
      </div>

      <div style={styles.controls} >
        <button style={styles.btnn} onClick={showtactic}>{!pvtrying ? "Show Tactic" : "Hide tactic"}</button>
        <div style={styles.buttonRow}>
          <button style={styles.buttonn} onClick={onDecrease} title="Previous">◀</button>
          <button style={styles.buttonn} onClick={onReset} title="Reset">⟲</button>
          <button style={styles.buttonn} onClick={onIncrease} title="Next">▶</button>
          <button style={{...styles.buttonn, ...styles.flipButton}} onClick={onflip} disabled={pvtrying} title="Flip Board">🔁</button>
        </div>
      </div>

      <div style={styles.adBox}>
        <p style={styles.adText}>Advertisement Space</p>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: "350px",
    padding: "20px",
    backgroundColor: "#1a0909ff",
    borderLeft: "2px solid #ccc",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "sans-serif",
    height: "100vh",
    boxSizing: "border-box",
  },
  moveBox: {
    width: "100%",
    aspectRatio: "1 / 1",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "20px",
    backgroundColor: "#fff",
    overflowY: "auto",
  },
  moveTitle: {
    margin: 0,
    fontSize: "18px",
    marginBottom: "10px",
    textAlign: "center",
  },
  moveContent: {
    fontSize: "14px",
    lineHeight: "1.4",
  },
  controls: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
  },
  buttonRow: {
    display: "flex",
    gap: "8px",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop :"5%",
  },
  btn :{
    color :"black",
    padding : "0",
    gap :"0px"
  },

  buttonn: {
    padding: "10px 15px",
    fontSize: "1.5rem",
    borderRadius: "6px",
    border: "1px solid #aaa",
    backgroundColor: "#eee",
    cursor: "pointer",
    transition: "all 0.2s",
    color :"black",
    flex: "1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  flipButton: {
    maxWidth: "60px",
  },
  btnn :{
    color : "white",
    width : "fit-content",
    padding: "5px 10px",
    fontSize: "0.9rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  adBox: {
    width: "100%",
    height: "100px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "48%",
  },
  adText: {
    color: "#999",
    fontSize: "14px",
    margin: 0,
  }
};

export default Ansidebar;
