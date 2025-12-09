import React, { useState } from "react";
import "./DayPeriodForm.css";
import sampleData from "./sampleData";

export default function DayPeriodForm({ formValues, onFormChange, onCustomData }) {
  const [local, setLocal] = useState(formValues || {
    yearFrom: "2021",
    yearTo: "2024",
    monthFrom: "იანვარი",
    monthTo: "მარტი",
    amount: 100
  });

  const [manual, setManual] = useState("");

  function updateField(key, value) {
    const next = { ...local, [key]: value };
    setLocal(next);
    onFormChange && onFormChange(next);
  }

  function applyManual() {
    // თუ მომხმარებელი ჩაწერს CSV like: "2021-01:1.2,2021-02:2.0"
    if (!manual) return;
    const parts = manual.split(",").map(p => p.trim()).filter(Boolean);
    const points = parts.map(p => {
      const [k,v] = p.split(":").map(s => s && s.trim());
      return { name: k || "point", value: Number(v || 0) };
    });
    if (points.length) onCustomData && onCustomData(points);
  }

  function loadExample() {
    onCustomData && onCustomData(sampleData);
  }

  return (
    <div className="card form-panel">
      <div className="form-left">
        <div style={{marginBottom:10, fontWeight:700}}>დღის პერიოდი</div>

        <div className="form-row">
          <label>საწყისი:</label>
          <select className="select" value={local.yearFrom} onChange={e=>updateField("yearFrom", e.target.value)}>
            <option>2021</option>
            <option>2022</option>
            <option>2023</option>
            <option>2024</option>
          </select>

          <select className="select" value={local.monthFrom} onChange={e=>updateField("monthFrom", e.target.value)}>
            <option>იანვარი</option>
            <option>მარტი</option>
            <option>აპრილი</option>
            <option>მაისი</option>
          </select>
        </div>

        <div className="form-row">
          <label>საბოლოო:</label>
          <select className="select" value={local.yearTo} onChange={e=>updateField("yearTo", e.target.value)}>
            <option>2022</option>
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
          </select>

          <select className="select" value={local.monthTo} onChange={e=>updateField("monthTo", e.target.value)}>
            <option>მარტი</option>
            <option>აპრილი</option>
            <option>მაისი</option>
            <option>ივნისი</option>
          </select>
        </div>

        <div className="form-row">
          <label>თანხა:</label>
          <input type="number" value={local.amount} onChange={e=>updateField("amount", e.target.value)} />
        </div>

        <div style={{display:"flex", gap:8}}>
          <button className="small-btn" onClick={loadExample}>Set sample</button>
          <button className="small-btn" onClick={applyManual}>Apply manual</button>
        </div>

        <div style={{marginTop:12}}>
          <div style={{fontSize:13, marginBottom:6, color:"#444"}}>საშუალო მნიშვნელობები (manual CSV):</div>
          <textarea placeholder="მაგ: 2021-Jan:1.2, 2021-Feb:2.0" value={manual} onChange={e=>setManual(e.target.value)} style={{minHeight:70}} />
        </div>

      </div>

      <div className="form-right">
        <div style={{fontWeight:700, marginBottom:8}}>შედეგი</div>
        <div style={{fontSize:14, color:"#444", lineHeight:1.6}}>
          აირჩიე პერიოდი და შესატანად თანხა — შემდეგ დააჭირე <b>Set sample</b> ან ჩასვით CSV, რომ გრაფიკზე აისახოს მონაცემები.
          <div style={{marginTop:12, fontSize:13, color:"#999"}}>მხოლოდ მაგალითი — არ არის დაკავშირებული backend-თან.</div>
        </div>
      </div>
    </div>
  );
}