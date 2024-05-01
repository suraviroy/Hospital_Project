import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList,Dimensions, ScrollView,Linking } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily } from '../../../GlobalStyles';
import { backendURL } from "../../backendapi";


const UpdatedDetails = ({patientId}) => {
    const [importantHistory, setImportantHistory] = useState(null);
    const [existingDeseases,setexistingDeseases] = useState(null)
    const [problemForConsultation,setproblemForConsultation] = useState(null)
    const [pastHospitalization,setpastHospitalization] = useState(null)
    const [statusOfSickness, setStatusOfSickness] = useState(null);
   const [catScore, setCatScore] = useState(0);
   const [coordinator,setcoordinator]=useState(null);
    useEffect(() => {
      
      fetchData();
    }, []);
    const handleDischargeCertificatePress = (url) => {
      Linking.openURL(url);
    };
  
    const fetchData = async () => {
      try {
        
        const response = await fetch(`${backendURL}/adminRouter/patientDisease/${patientId}`);
        const data = await response.json();
  
        
        const importantHistoryData = data[0]?.visitCount[0]?.importantHistory;
        const existingDeseasesData = data[0]?.visitCount[0]?.existingDeseases;
        const problemForConsultationData = data[0]?.visitCount[0]?.problemForConsultation;
        const pastHospitalizationData = data[0]?.visitCount[0]?.pastHospitalization;
        const statusOfSicknessData = data[0]?.visitCount[0]?.statusOfSickness;
        const catScoreData = data[0]?.visitCount[0]?.catScore;
        const coordinatordata = data[0]?.coordinator;
        setImportantHistory(importantHistoryData);
        setexistingDeseases(existingDeseasesData);
        setproblemForConsultation(problemForConsultationData);
        setpastHospitalization(pastHospitalizationData)
        setStatusOfSickness(statusOfSicknessData);
        setCatScore(catScoreData);
        setcoordinator(coordinatordata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContent}>
        <View style={styles.profileContainer}>
        <Text style={styles.subHead6}>Coordinator : {coordinator}</Text>
        <View style={styles.exiDisContainer}>
        {existingDeseases && (
          <View>
             <Text style={styles.texthead2}>Existing Diseases</Text>
        </View>
         )}
          {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.diabetes && existingDeseases.diabetes.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Diabetes {"\n"}
             Duration:  {existingDeseases.diabetes.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.diabetes.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.diabetes.statusOfDisease}
             </Text>
            )}
        </View>
         )}
        {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.hypertension && existingDeseases.hypertension.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Hypertension {"\n"}
             Duration:  {existingDeseases.hypertension.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.hypertension.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.hypertension.statusOfDisease}
             </Text>
            )}
        </View>
         )}
          {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.ihd && existingDeseases.ihd.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  IHD {"\n"}
             Duration:  {existingDeseases.ihd.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.ihd.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.ihd.statusOfDisease}
             </Text>
            )}
        </View>
         )}
           {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.hypothyroidism && existingDeseases.hypothyroidism.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Hypothyroidism {"\n"}
             Duration:  {existingDeseases.hypothyroidism.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.hypothyroidism.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.hypothyroidism.statusOfDisease}
             </Text>
            )}
        </View>
         )}
          {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.allergicrhinitis && existingDeseases.allergicrhinitis.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Allergic Rhinitis{"\n"}
             Duration:  {existingDeseases.allergicrhinitis.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.allergicrhinitis.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.allergicrhinitis.statusOfDisease}
             </Text>
            )}
        </View>
         )}
          {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.hyperuricemia && existingDeseases.hyperuricemia.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Allergic Rhinitis{"\n"}
             Duration:  {existingDeseases.hyperuricemia.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.hyperuricemia.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.hyperuricemia.statusOfDisease}
             </Text>
            )}
        </View>
         )}
           {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.asthama && existingDeseases.asthama.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Asthama{"\n"}
             Duration:  {existingDeseases.asthama.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.asthama.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.asthama.statusOfDisease}
             </Text>
            )}
        </View>
         )}
          {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.tb && existingDeseases.tb.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  TB{"\n"}
             Duration:  {existingDeseases.tb.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.tb.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.tb.statusOfDisease}
             </Text>
            )}
        </View>
         )}
           {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.copd && existingDeseases.copd.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  COPD{"\n"}
             Duration:  {existingDeseases.copd.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.copd.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.copd.statusOfDisease}
             </Text>
            )}
        </View>
         )}
           {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.ild && existingDeseases.ild.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  ILD{"\n"}
             Duration:  {existingDeseases.ild.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.ild.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.ild.statusOfDisease}
             </Text>
            )}
        </View>
         )}
          {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.ibs && existingDeseases.ibs.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  IBS{"\n"}
             Duration:  {existingDeseases.ibs.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.ibs.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.ibs.statusOfDisease}
             </Text>
            )}
        </View>
         )}
          {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.inflammatoryboweldisease && existingDeseases.inflammatoryboweldisease.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Inflammatory Bowel Disease{"\n"}
             Duration:  {existingDeseases.inflammatoryboweldisease.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.inflammatoryboweldisease.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.inflammatoryboweldisease.statusOfDisease}
             </Text>
            )}
        </View>
         )}
          {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.depression && existingDeseases.depression.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Depression{"\n"}
             Duration:  {existingDeseases.depression.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.depression.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.depression.statusOfDisease}
             </Text>
            )}
        </View>
         )}
         {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.anxiety && existingDeseases.anxiety.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Anxiety{"\n"}
             Duration:  {existingDeseases.anxiety.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.anxiety.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.anxiety.statusOfDisease}
             </Text>
            )}
        </View>
         )}
         {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.osa && existingDeseases.osa.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  OSA{"\n"}
             Duration:  {existingDeseases.osa.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.osa.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.osa.statusOfDisease}
             </Text>
            )}
        </View>
         )}
         {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.collagenvasculardisease && existingDeseases.collagenvasculardisease.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Collagen Vascular Disease{"\n"}
             Duration:  {existingDeseases.collagenvasculardisease.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.collagenvasculardisease.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.collagenvasculardisease.statusOfDisease}
             </Text>
            )}
        </View>
         )}
        {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.malignancy && existingDeseases.malignancy.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Malignancy{"\n"}
             Organ:   {existingDeseases.malignancy.organ}
             {' '}  Duration:  {existingDeseases.malignancy.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.malignancy.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.malignancy.statusOfDisease}
             </Text>
            )}
        </View>
         )}
           {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.dyslipidemia && existingDeseases.dyslipidemia.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Dyslipidemia{"\n"}
             Duration:  {existingDeseases.dyslipidemia.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.dyslipidemia.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.dyslipidemia.statusOfDisease}
             </Text>
            )}
        </View>
         )}
        {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.cld && existingDeseases.cld.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  CLD{"\n"}
             Duration:  {existingDeseases.cld.duration.numericValue} 
             {' '}  Unit:  {existingDeseases.cld.duration.unit}{"\n"}
             Status of Disease:  {existingDeseases.cld.statusOfDisease}
             </Text>
            )}
        </View>
         )}
           {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.ckd && existingDeseases.ckd.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  CKD{"\n"}
             Organ:   {existingDeseases.ckd.typeofckd}
             {' '}  Duration:  {existingDeseases.ckd.duration.numericValue}{"\n"}
             Unit:  {existingDeseases.ckd.duration.unit}
             {' '}  Status of Disease:  {existingDeseases.ckd.statusOfDisease}
             </Text>
            )}
        </View>
         )}
           {existingDeseases && (
          <View  style={styles.backField}>
             {existingDeseases.others && existingDeseases.others.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Others{"\n"}
             Organ:   {existingDeseases.others.disease}
             {' '}  Duration:  {existingDeseases.others.duration.numericValue}{"\n"}
             Unit:  {existingDeseases.others.duration.unit}
             {' '}  Status of Disease:  {existingDeseases.others.statusOfDisease}
             </Text>
            )}
        </View>
         )}
         </View>
         <View style={styles.exiDisContainer}>
        {problemForConsultation && (
          <View>
             <Text style={styles.texthead2}>Problem For Consultation</Text>
        </View>
         )}
          {problemForConsultation && (
          <View  style={styles.backField}>
             {problemForConsultation.sob && problemForConsultation.sob.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease: SOB{"\n"}
             Duration:  {problemForConsultation.sob.duration.numericValue} 
             {' '}  Unit:  {problemForConsultation.sob.duration.unit}{"\n"}
             Status of Disease:  {problemForConsultation.sob.statusOfDisease}
             </Text>
            )}
        </View>
         )}
         {problemForConsultation && (
          <View  style={styles.backField}>
             {problemForConsultation.cough && problemForConsultation.cough.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease: Cough{"\n"}
             Duration:  {problemForConsultation.cough.duration.numericValue} 
             {' '}  Unit:  {problemForConsultation.cough.duration.unit}{"\n"}
             Status of Disease:  {problemForConsultation.cough.statusOfDisease}
             </Text>
            )}
        </View>
         )}
           {problemForConsultation && (
          <View  style={styles.backField}>
             {problemForConsultation.bleedingwithcough && problemForConsultation.bleedingwithcough.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease: Bleeding With Cough{"\n"}
             Duration:  {problemForConsultation.bleedingwithcough.duration.numericValue} 
             {' '}  Unit:  {problemForConsultation.bleedingwithcough.duration.unit}{"\n"}
             Status of Disease:  {problemForConsultation.bleedingwithcough.statusOfDisease}
             </Text>
            )}
        </View>
         )}
          {problemForConsultation && (
          <View  style={styles.backField}>
             {problemForConsultation.chestpain && problemForConsultation.chestpain.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease: Chest Pain{"\n"}
             Duration:  {problemForConsultation.chestpain.duration.numericValue} 
             {' '}  Unit:  {problemForConsultation.chestpain.duration.unit}{"\n"}
             Status of Disease:  {problemForConsultation.chestpain.statusOfDisease}
             </Text>
            )}
        </View>
         )}
        {problemForConsultation && (
          <View  style={styles.backField}>
             {problemForConsultation.wheeze && problemForConsultation.wheeze.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease: Wheeze{"\n"}
             Duration:  {problemForConsultation.wheeze.duration.numericValue} 
             {' '}  Unit:  {problemForConsultation.wheeze.duration.unit}{"\n"}
             Status of Disease:  {problemForConsultation.wheeze.statusOfDisease}
             </Text>
            )}
        </View>
         )}
         {problemForConsultation && (
          <View  style={styles.backField}>
             {problemForConsultation.phlagm && problemForConsultation.phlagm.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease: Phlagm{"\n"}
             Duration:  {problemForConsultation.phlagm.duration.numericValue} 
             {' '}  Unit:  {problemForConsultation.phlagm.duration.unit}{"\n"}
             Status of Disease:  {problemForConsultation.phlagm.statusOfDisease}
             </Text>
            )}
        </View>
         )}
          {problemForConsultation && (
          <View  style={styles.backField}>
             {problemForConsultation.nasalcongestion && problemForConsultation.nasalcongestion.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease: Nasal Congestion{"\n"}
             Duration:  {problemForConsultation.nasalcongestion.duration.numericValue} 
             {' '}  Unit:  {problemForConsultation.nasalcongestion.duration.unit}{"\n"}
             Status of Disease:  {problemForConsultation.nasalcongestion.statusOfDisease}
             </Text>
            )}
        </View>
         )}
        {problemForConsultation && (
          <View  style={styles.backField}>
             {problemForConsultation.snoring && problemForConsultation.snoring.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease: Snoring{"\n"}
             Duration:  {problemForConsultation.snoring.duration.numericValue} 
             {' '}  Unit:  {problemForConsultation.snoring.duration.unit}{"\n"}
             Status of Disease:  {problemForConsultation.snoring.statusOfDisease}
             </Text>
            )}
        </View>
         )}
          {problemForConsultation && (
          <View  style={styles.backField}>
             {problemForConsultation.daytimesleepiness && problemForConsultation.daytimesleepiness.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease: Day Time Sleepiness{"\n"}
             Duration:  {problemForConsultation.daytimesleepiness.duration.numericValue} 
             {' '}  Unit:  {problemForConsultation.daytimesleepiness.duration.unit}{"\n"}
             Status of Disease:  {problemForConsultation.daytimesleepiness.statusOfDisease}
             </Text>
            )}
        </View>
         )}
         {problemForConsultation && (
          <View  style={styles.backField}>
             {problemForConsultation.weakness && problemForConsultation.weakness.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease: Weakness{"\n"}
             Duration:  {problemForConsultation.weakness.duration.numericValue} 
             {' '}  Unit:  {problemForConsultation.weakness.duration.unit}{"\n"}
             Status of Disease:  {problemForConsultation.weakness.statusOfDisease}
             </Text>
            )}
        </View>
         )}
          {problemForConsultation && (
          <View  style={styles.backField}>
             {problemForConsultation.lethargy && problemForConsultation.lethargy.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Lethargy{"\n"}
             Duration:  {problemForConsultation.lethargy.duration.numericValue} 
             {' '}  Unit:  {problemForConsultation.lethargy.duration.unit}{"\n"}
             Status of Disease:  {problemForConsultation.lethargy.statusOfDisease}
             </Text>
            )}
        </View>
         )}
        {problemForConsultation && (
          <View  style={styles.backField}>
             {problemForConsultation.lowmood && problemForConsultation.lowmood.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Low mood{"\n"}
             Duration:  {problemForConsultation.lowmood.duration.numericValue} 
             {' '}  Unit:  {problemForConsultation.lowmood.duration.unit}{"\n"}
             Status of Disease:  {problemForConsultation.lowmood.statusOfDisease}
             </Text>
            )}
        </View>
         )}
         {problemForConsultation && (
          <View  style={styles.backField}>
             {problemForConsultation.diarrhoea && problemForConsultation.diarrhoea.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Diarrhoea{"\n"}
             Duration:  {problemForConsultation.diarrhoea.duration.numericValue} 
             {' '}  Unit:  {problemForConsultation.diarrhoea.duration.unit}{"\n"}
             Status of Disease:  {problemForConsultation.diarrhoea.statusOfDisease}
             </Text>
            )}
        </View>
         )}
      {problemForConsultation && problemForConsultation.uncontrolleddisease && problemForConsultation.uncontrolleddisease.length > 0 && (
   <View style={styles.backField}>
    {problemForConsultation.uncontrolleddisease.map((disease, index) => (
      <View key={index}>
        <Text style={styles.subHead4}>
          Uncontrolled Disease: {disease.name === "Others" ? disease.disease : disease.name}{"\n"}
          Duration: {disease.duration.numericValue} {' '} Unit: {disease.duration.unit}{"\n"}
          Status of Disease: {disease.statusOfDisease}
        </Text>
      </View>
    ))}
  </View>
)}
 {problemForConsultation && (
          <View  style={styles.backField}>
             {problemForConsultation.others && problemForConsultation.others.duration.numericValue !== 0 && (
              <Text style={styles.subHead4}>Disease:  Others{"\n"}
             Organ:   {problemForConsultation.others.disease}
             {' '}  Duration:  {problemForConsultation.others.duration.numericValue}{"\n"}
             Unit:  {problemForConsultation.others.duration.unit}
             {' '}  Status of Disease:  {problemForConsultation.others.statusOfDisease}
             </Text>
            )}
        </View>
         )}
         </View>
         <View style={styles.imphisContainer}>
        {importantHistory && (
          <View>
             <Text style={styles.texthead2}>Important History</Text>
        </View>
         )}
        {importantHistory && (
          <View  style={styles.backField}>
            {importantHistory.allergy && importantHistory.allergy.typeOfAllergy !== "NA" && (
              <Text style={styles.subHead}>Allergy: {importantHistory.allergy.typeOfAllergy}
             {' '}  Duration:  {importantHistory.allergy.duration.numericValue} 
             {' '}  Unit:  {importantHistory.allergy.duration.unit}</Text>
            )}
            {importantHistory.drugReaction && importantHistory.drugReaction.typeOfDrug !== "NA" && (
              <Text style={styles.subHead2}>Drug Type: {importantHistory.drugReaction.typeOfDrug}
              {' '}  Drug Reaction: {importantHistory.drugReaction.typeOfReaction}  
              </Text>
            )}
            {importantHistory.pastSurgery.typeOfSurgery !== "NA" && (
              <Text style={styles.subHead3}>Past Surgery: {importantHistory.pastSurgery.typeOfSurgery}
              {'\n'}Year Of Surgery:  {importantHistory.pastSurgery.year}  </Text>
           )}
             {importantHistory.pastDisease.typeOfDisease !== "NA" && (
              <Text style={styles.subHead2}>Past Disease: {importantHistory.pastDisease.typeOfDisease}
               </Text>
           )}
             {importantHistory.familyHistory !== "NA" && (
              <Text style={styles.subHead2}>Family History: {importantHistory.familyHistory}
               </Text>
           )}
           {importantHistory.occupation !== "NA" && (
              <Text style={styles.subHead2}>Occupation: {importantHistory.occupation}
               </Text>
           )}
             {importantHistory.exposure.dust.duration.numericValue !== 0 && (
              <Text style={styles.subHead3}>Exposure: Dust{"\n"}
                Duration:  {importantHistory.exposure.dust.duration.numericValue}
                {' '} Unit:  {importantHistory.exposure.dust.duration.unit}  
               </Text>
           )}
            {importantHistory.pastSurgery && importantHistory.exposure.cottondust.duration.numericValue !== 0 && (
              <Text style={styles.subHead3}>Exposure:  Cotton Dust{"\n"}
                Duration:  {importantHistory.exposure.cottondust.duration.numericValue}
                {' '}  Unit:  {importantHistory.exposure.cottondust.duration.unit}  
               </Text>
           )}
            {importantHistory.exposure.wooddust.duration.numericValue !== 0 && (
              <Text style={styles.subHead3}>Exposure:  Wood Dust{"\n"}
               Duration:  {importantHistory.exposure.wooddust.duration.numericValue}
                {' '}  Unit:  {importantHistory.exposure.wooddust.duration.unit}  
               </Text>
           )}
            {importantHistory.exposure.pigeon.duration.numericValue !== 0 && (
              <Text style={styles.subHead3}>Exposure:  Pigeon{"\n"}
               Duration:  {importantHistory.exposure.pigeon.duration.numericValue}
                {' '}  Unit :  {importantHistory.exposure.pigeon.duration.unit}  
               </Text>
           )}
             {importantHistory.exposure.hay.duration.numericValue !== 0 && (
              <Text style={styles.subHead3}>Exposure:  Hay{"\n"}
               Duration:  {importantHistory.exposure.hay.duration.numericValue}
                {' '}  Unit :  {importantHistory.exposure.hay.duration.unit}  
               </Text>
           )}
           {importantHistory.exposure.moulds.duration.numericValue !== 0 && (
              <Text style={styles.subHead3}>Exposure:  Moulds{"\n"}
              Duration:   {importantHistory.exposure.moulds.duration.numericValue}
                {' '}  Unit :  {importantHistory.exposure.moulds.duration.unit}  
               </Text>
           )}
            {importantHistory.pastSurgery && importantHistory.exposure.pollen.duration.numericValue !== 0 && (
              <Text style={styles.subHead3}>Exposure:  Pollen{"\n"} 
              Duration:   {importantHistory.exposure.pollen.duration.numericValue}
                {' '}  Unit :  {importantHistory.exposure.pollen.duration.unit}  
               </Text>
           )}
            {importantHistory.exposure.chemical.duration.numericValue !== 0 && (
              <Text style={styles.subHead3}>Exposure:  Chemical{"\n"}
               Duration:   {importantHistory.exposure.chemical.duration.numericValue}
                {' '}  Unit :  {importantHistory.exposure.chemical.duration.unit}  
               </Text>
            
           )}
            {importantHistory.exposure.stonedust.duration.numericValue !== 0 && (
              <Text style={styles.subHead3}>Exposure:  Stone Dust{"\n"}
               Duration :   {importantHistory.exposure.stonedust.duration.numericValue}
                {' '}  Unit :  {importantHistory.exposure.stonedust.duration.unit}  
               </Text>
            
           )}
           {importantHistory.exposure.others.typeOfExposure !== "NA" && (
              <Text style={styles.subHead3}>Exposure:  {importantHistory.exposure.others.typeOfExposure}{"\n"}
              Duration:  {importantHistory.exposure.others.duration.numericValue}
              {' '}  Unit :  {importantHistory.exposure.chemical.duration.unit}  
               </Text>
           )}
          </View>
        )}
         </View>
         <View style={styles.exiDisContainer}>
        {pastHospitalization && pastHospitalization.length > 0 && (
          <Text style={styles.texthead2}>Past Hospitalization</Text>
        )}
        {pastHospitalization && pastHospitalization.length > 0 && (
          <View style={styles.backField}>
            {pastHospitalization.map((hospitalization, index) => (
              <View key={index} style={styles.hospitalizationItem}>
                <Text style={styles.subHead5}>
                  Year of Hospitalization: {hospitalization.yearOfHospitalization}{'\n'}
                  Hospitalized for : {hospitalization.days}  Days{'\n'}
                  Reason: {hospitalization.reason}{'\n'}
                  Discharge Certificate:{'       '}
                  {hospitalization.dischargeCertificate === 'NA' ? (
              <Text style={{ borderRadius: 4, padding: 7, fontSize: 13, fontWeight: '700' }}>Not Uploaded</Text>
            ) : (
              <TouchableOpacity onPress={() => handleDischargeCertificatePress(hospitalization.dischargeCertificate)}>
                <Text style={{ backgroundColor: '#B21515', borderRadius: 4, padding: 7, color: 'white', fontSize: 12, fontWeight: '700' }}>Open PDF</Text>
              </TouchableOpacity>
            )}
                </Text>
              </View>
            ))}
          </View>
        )}
   </View>
        <Text style={styles.subHead6}>Status of Sickness: {statusOfSickness}</Text>
        <Text style={styles.subHead6}>CAT Score: {catScore}</Text>
        </View>
        </ScrollView>
      </SafeAreaView>
    );
}
export default UpdatedDetails;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: windowWidth*-0.5,
        paddingBottom: windowWidth*0.05,
    },
    hospitalizationItem: {
      marginBottom: 20,
    },
    scrollContent: {
        flexGrow: 1,
    },
    profileContainer: {
        // alignItems: 'center',
        marginLeft: windowWidth*0.01,
        marginTop: windowWidth*0.05,
    },
backField: {
    marginLeft: windowWidth*0.02,
      },
texthead: {
    marginLeft: windowWidth*0.03,
    fontWeight: "600",
    fontFamily: 'extrabold01',
    fontSize: 17,
},
texthead2: {
  marginLeft: windowWidth*0.03,
  fontWeight: "600",
  fontFamily: 'extrabold01',
  fontSize: 17,
  marginTop: windowWidth*0.02,
  marginBottom: windowWidth*0.02,
},
texthead3: {
  marginLeft: windowWidth*0.03,
  fontWeight: "600",
  fontFamily: 'extrabold01',
  fontSize: 14,
  marginTop: windowWidth*0.01,
},
subHead:{
    width: "95%",
    height: windowWidth * 0.10,
    
    marginTop: windowWidth * 0.01,
    paddingTop: windowWidth * 0.02,
    borderRadius: windowWidth*0.01,
    backgroundColor: "#D9D9D9",
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'bold02',
    fontWeight: "700",
    fontSize: 15,   
},
subHead2:{
    marginTop: windowWidth*0.01,
    width: "95%",
    height: windowWidth * 0.10,
    paddingTop: windowWidth * 0.02,
    borderRadius: windowWidth*0.01,
    backgroundColor: "#D9D9D9",
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'bold02',
    fontWeight: "700",
    fontSize: 15,   
},
subHead3:{
    marginTop: windowWidth*0.01,
    width: "95%",
    height: windowWidth * 0.15,
    backgroundColor: "#e3e3e3",
    paddingTop: windowWidth * 0.02,
    borderRadius: windowWidth*0.01,
    backgroundColor: "#D9D9D9",
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'bold02',
    fontWeight: "700",
    paddingBottom: windowWidth * 0.01,
    fontSize: 15,   
},
subHead4:{
  marginTop: windowWidth*0.01,
  width: "95%",
  height: windowWidth * 0.20,
  backgroundColor: "#e3e3e3",
  paddingTop: windowWidth * 0.02,
  borderRadius: windowWidth*0.01,
  backgroundColor: "#D9D9D9",
  paddingLeft: 15,
  paddingRight: 15,
  fontFamily: 'bold02',
  fontWeight: "700",
  paddingBottom: windowWidth * 0.01,
  fontSize: 15,   
},
subHead5:{
  marginTop: windowWidth*0.01,
  width: "95%",
  height: windowWidth * 0.28,
  backgroundColor: "#e3e3e3",
  paddingTop: windowWidth * 0.02,
  borderRadius: windowWidth*0.01,
  backgroundColor: "#D9D9D9",
  paddingLeft: 15,
  paddingRight: 15,
  fontFamily: 'bold02',
  fontWeight: "700",
  paddingBottom: windowWidth * 0.01,
  fontSize: 15,   
},
subHead6:{
  marginTop: windowWidth*0.01,
  width: "95%",
  height: windowWidth * 0.10,
  marginLeft: windowWidth*0.01,
  paddingTop: windowWidth * 0.02,
  borderRadius: windowWidth*0.01,
  // borderWidth: 1,
  // borderColor: '#000000',
  backgroundColor: "#D9D9D9",
  paddingLeft: 15,
  paddingRight: 15,
  fontFamily: 'regular89',
  fontWeight: "700",
  paddingBottom: windowWidth * 0.01,
  fontSize: 15,   
}
})