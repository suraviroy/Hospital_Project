import React, { useState, useEffect,useCallback } from 'react';
import { View,ActivityIndicator, Text,Platform,StatusBar, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions,Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; 
const windowWidth = Dimensions.get('window').width;
import { backendURL } from "../backendapi";
import { Ionicons } from '@expo/vector-icons';

const NotificationDetails = ({ patientId }) => { 
    const navigation = useNavigation();
    const [basicDetails, setBasicDetails] = useState({});
    const [visitData, setVisitData] = useState([]);
  const [coordinator, setCoordinator] = useState(null);
  const [expandedVisits, setExpandedVisits] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  const handleDischargeCertificatePress = (url) => {
    Linking.openURL(`${backendURL}/getfile/${url}`);
  };
  const openDial = useCallback((phNumber) => {
    try {
        console.log('Raw phone number:', phNumber);
        if (!phNumber) {
            console.error('Phone number is undefined or null');
            return;
        }

        const cleanNumber = phNumber.toString().replace(/\D/g, '');
        
        console.log('Cleaned phone number:', cleanNumber);

        if (cleanNumber.length < 10) {
            console.error('Invalid phone number length:', cleanNumber);
            return;
        }
        const formattedNumber = cleanNumber.startsWith('+91') 
            ? `+${cleanNumber}` 
            : cleanNumber.length === 10 
                ? `+91${cleanNumber}` 
                : `+${cleanNumber}`;

        const dialURL = Platform.OS === "android" 
            ? `tel:${formattedNumber}` 
            : `telprompt:${formattedNumber}`;
        
        Linking.canOpenURL(dialURL).then(supported => {
            if (supported) {
                Linking.openURL(dialURL).catch(err => {
                    console.error('Error opening dial URL:', err);
                });
            } else {
                console.log(`Cannot open dial for number: ${formattedNumber}`);
            }
        }).catch(err => {
            console.error('Error checking URL support:', err);
        });
    } catch (error) {
        console.error('Error in openDial function:', error);
    }
}, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${backendURL}/adminRouter/patientDisease/${patientId}`);
      const data = await response.json();

      setVisitData(data[0]?.visitCount || []);
      setCoordinator(data[0]?.coordinator);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleVisitExpansion = (index) => {
    setExpandedVisits(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  useEffect(() => {
    fetch(`${backendURL}/adminRouter/PatientBasicDetailsNewWP/${patientId}`)
        .then(response => response.json())
        .then(data => {
            setBasicDetails(data[0]);
            setIsLoading(false);
        })
        .catch(error => {
            console.error('Error fetching patient basic details:', error);
            setIsLoading(false);
        }
      );
}, [basicDetails]);

if (isLoading) {
  return (
      <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#096759" />
      </View>
  );
}

    const handleClose = () => {
        navigation.goBack();
    };

    if (!basicDetails) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.text45}>Loading...</Text>
            </View>
        );
    }
    const renderVisitDetails = (visit, index) => {
      const isExpanded = expandedVisits[index];
  
      return (
        <View key={index} style={styles.visitContainer}>
          <TouchableOpacity onPress={() => toggleVisitExpansion(index)} style={styles.visitHeader}>
          <View style={{flexDirection:'row', marginLeft: windowWidth*0.01}}>
            <Text style={styles.visitHeaderText}>Visit Date: {visit.visitDate}  Time: {visit.visitTime}</Text>
            <Ionicons 
              name={isExpanded ? "chevron-up" : "chevron-down"}   
              size={20} 
              color="#000" 
            />
            </View>
            
          </TouchableOpacity>
         
          {isExpanded && (
            <View style={styles.visitDetails}>
              {renderExistingDiseases(visit.existingDeseases)}
              {renderProblemForConsultation(visit.problemForConsultation)}
              {renderImportantHistory(visit.importantHistory)}
              {renderPastHospitalization(visit.pastHospitalization)}
              {renderPrescription(visit.prescription)}
              {renderOtherDocuments(visit.otherdocuments)}
              <View  style={styles.backField2}>
              <Text style={styles.subHead6}>Status of Sickness: {visit.statusOfSickness}</Text>
              <Text style={styles.subHead6}>CAT Score: {visit.catScore}</Text>
              </View>
            </View>
          )}
        </View>
      );
    };
    const renderExistingDiseases = (existingDeseases) => {
      if (!existingDeseases) return null;
    
      return (
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
             {' '} Duration:  {existingDeseases.malignancy.duration.numericValue}{"\n"} 
              Unit:  {existingDeseases.malignancy.duration.unit} {' '} 
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
              <Text style={styles.subHead5}>Disease:  CKD {"\n"}
             Type of CKD:   {existingDeseases.ckd.typeofckd} {"\n"}
            Duration:  {existingDeseases.ckd.duration.numericValue}  {' '}  
             Unit:  {existingDeseases.ckd.duration.unit} {"\n"}
            Status of Disease:  {existingDeseases.ckd.statusOfDisease}
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
      );
    };
    const renderProblemForConsultation = (problemForConsultation) => {
      if (!problemForConsultation) return null;
    
      return (
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
      {problemForConsultation && problemForConsultation.uncontrolleddisease.length > 0 && (
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
      );
    };
    const renderImportantHistory = (importantHistory) => {
      if (!importantHistory) return null;
    
      return (
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
      );
    };
    const renderPastHospitalization = (pastHospitalization) => {
      if (!pastHospitalization) return null;
    
      return (
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
                  <Text style={{ backgroundColor: '#B21515', borderRadius: 4, padding: 7, color: 'white', fontSize: 12, fontWeight: '700' }}>Open File</Text>
                </TouchableOpacity>
              )}
                  </Text>
                </View>
              ))}
            </View>
          )}
     </View>
      );
    };
    const renderOtherDocuments = (otherdocuments) => {
      if (!otherdocuments) return null;
    
      return (
        <View style={styles.exiDisContainer}>
        {  otherdocuments &&   otherdocuments.length > 0 && (
          <Text style={styles.texthead2}>Other Docmunets</Text>
        )}
        {  otherdocuments &&   otherdocuments.length > 0 && (
          <View style={styles.backField}>
            {  otherdocuments.map((hospitalization, index) => (
              <View key={index} style={styles.hospitalizationItem}>
              <Text style={styles.subHead5}>
             Document Name: {hospitalization.documentname}{'\n'}
                  {hospitalization.document === 'NA' ? (
              <Text style={{ borderRadius: 4, padding: 7, fontSize: 13, fontWeight: '700' }}>Not Uploaded</Text>
            ) : (
              <TouchableOpacity onPress={() => handleDischargeCertificatePress(hospitalization.document)}>
                <Text style={{marginTop: windowWidth*0.03, marginLeft: windowWidth*0.05,width:windowWidth*0.2, backgroundColor: '#B21515', borderRadius: 4, padding: 7, color: 'white', fontSize: 12, fontWeight: '700' }}>Open File</Text>
              </TouchableOpacity>
            )}
                </Text>
              </View>
            ))}
          </View>
        )}
   </View>
    );
  };
  
      const renderPrescription = (prescription) => {
        if (!prescription) return null;
      
      return (
        <View style={styles.exiDisContainer}>
        {  prescription &&   prescription.length > 0 && (
          <Text style={styles.texthead2}>Prescription</Text>
        )}
        {  prescription &&   prescription.length > 0 && (
          <View style={styles.backField}>
            {  prescription.map((hospitalization, index) => (
              <View key={index} style={styles.hospitalizationItem}>
                    {hospitalization. prescriptiondocument === 'NA' ? (
                <Text style={{ borderRadius: 4, padding: 7, fontSize: 13, fontWeight: '700' }}>Not Uploaded</Text>
              ) : (
                <TouchableOpacity onPress={() => handleDischargeCertificatePress(hospitalization.prescriptiondocument)}>
                  <Text style={{marginLeft: windowWidth*0.05,width:windowWidth*0.2, backgroundColor: '#B21515', borderRadius: 4, padding: 7, color: 'white', fontSize: 12, fontWeight: '700' }}>Open File</Text>
                </TouchableOpacity>
              )}
                  
                </View>
              ))}
            </View>
          )}
     </View>
      );
    };
  
    
    return (
        <SafeAreaView style={styles.container}>
           <StatusBar 
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
            backgroundColor="#FFFFFF"
            translucent={false}
        />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* <View style={styles.registerTextContainer}>
                    <Text style={styles.registerText}>Patient Basic Details</Text>
                </View> */}
                  <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => openDial(basicDetails.contactNumber)}>
                  <Text style={[styles.buttonText, styles.cancelText]}>Call Patient</Text>
              </TouchableOpacity>
                <View style={styles.profileContainer1}>
                    {basicDetails.image ? (
                        <Image source={{uri: `${backendURL}/getfile/${basicDetails.image}`}} style={styles.profileImage} />
                    ) : (
                        <Image source={require('../../assets/images/user.png')} style={styles.profileImage} />
                    )}
                    <Text style={styles.profileText}>Profile Picture</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Patient Name:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.name}</Text></View>
                    <Text style={styles.label}>Age:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.age}</Text></View>
                    <Text style={styles.label}>Gender:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.gender}</Text></View>
                    <Text style={styles.label}>Patient ID:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.patientId}</Text></View>
                    <Text style={styles.label}>Contact Number:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.contactNumber}</Text></View>
                    <Text style={styles.label}>Consulting Doctor:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.consultingDoctor}</Text></View>
                    <Text style={styles.label}>Email:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.email}</Text></View>
                    <Text style={styles.label}>Blood Group:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.bloodGroup}</Text></View>
                    <Text style={styles.label}>Address:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.address}</Text></View>
                    <Text style={styles.label}>State:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.state}</Text></View>
                    <Text style={styles.label}>Country:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.country}</Text></View>
                    <Text style={styles.label}>Local Contact Name:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.localContactName}</Text></View>
                    <Text style={styles.label}>Local Contact Relation:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.localContactRelation}</Text></View>
                    <Text style={styles.label}>Local Contact Number:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.localContactNumber}</Text></View>
                </View>
          <View style={styles.profileContainer}>
          <View style={styles.backField3}>
          <Text style={styles.label}>Coordinator:</Text>
          <Text style={styles.subHead7}>{coordinator}</Text>
          </View>
          {visitData.map((visit, index) => renderVisitDetails(visit, index))}
        </View>
            </ScrollView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
  visitContainer: {
    marginTop: windowWidth * 0.03,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
  visitHeader: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  visitHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  visitDetails: {
    padding: windowWidth * 0.03,
  },
    hospitalizationItem: {
      marginBottom: 20,
    },
    scrollContent: {
        flexGrow: 1,
    },
    profileContainer: {
        marginLeft: windowWidth*0.01,
        marginTop: windowWidth*0.05,
        marginRight: windowWidth*0.01,
    },
  backField: {
  marginLeft: -windowWidth*0.04,
  marginRight: -windowWidth*0.09,
      },
      backField2: {
        marginLeft: -windowWidth*0.02,
        marginRight: -windowWidth*0.08,
            },
      backField3: {
        marginLeft: windowWidth*0.01,
        marginRight: -windowWidth*0.02,
      },
texthead: {
    marginLeft: windowWidth*0.03,
    fontWeight: "600",
    fontFamily: 'extrabold01',
    fontSize: 17,
},
texthead2: {
  marginLeft: -windowWidth*0.01,
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
    // height: windowWidth * 0.10,
    marginTop: windowWidth * 0.01,
    paddingTop: windowWidth * 0.02,
    borderRadius: windowWidth*0.01,
    backgroundColor: '#F1F4F3',
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'bold02',
    fontWeight: "700",
    fontSize: 15,   
},
subHead2:{
    marginTop: windowWidth*0.01,
    width: "95%",
    // height: windowWidth * 0.10,
    paddingTop: windowWidth * 0.02,
    borderRadius: windowWidth*0.01,
    backgroundColor: '#F1F4F3',
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'bold02',
    fontWeight: "700",
    fontSize: 15,   
},
subHead3:{
    marginTop: windowWidth*0.01,
    width: "95%",
    // height: windowWidth * 0.15,
    backgroundColor: "#e3e3e3",
    paddingTop: windowWidth * 0.02,
    borderRadius: windowWidth*0.01,
    backgroundColor: '#F1F4F3',
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
  // height: windowWidth * 0.20,
  backgroundColor: "#e3e3e3",
  paddingTop: windowWidth * 0.02,
  borderRadius: windowWidth*0.01,
  backgroundColor: '#F1F4F3',
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
  // height: windowWidth * 0.28,
  backgroundColor: "#e3e3e3",
  paddingTop: windowWidth * 0.02,
  borderRadius: windowWidth*0.01,
  backgroundColor: '#F1F4F3',
  paddingLeft: 15,
  paddingRight: 15,
  fontFamily: 'bold02',
  fontWeight: "700",
  paddingBottom: windowWidth * 0.01,
  fontSize: 15,   
},
subHead6:{
  marginTop: windowWidth*0.01,
  // height: windowWidth * 0.10,
  marginLeft: -windowWidth*0.02,
  paddingTop: windowWidth * 0.02,
  borderRadius: windowWidth*0.01,
  marginRight: windowWidth*0.04,
  backgroundColor: '#F1F4F3',
  paddingLeft: 15,
  paddingRight: 15,
  fontFamily: 'regular89',
  fontWeight: "700",
  paddingBottom: windowWidth * 0.01,
  fontSize: 15,  
},
subHead7:{
  marginTop: windowWidth*0.01,
  // height: windowWidth * 0.10,
  marginLeft: windowWidth*0.01,
  paddingTop: windowWidth * 0.02,
  borderRadius: windowWidth*0.01,
  marginRight: windowWidth*0.04,
  backgroundColor: '#F1F4F3',
  paddingLeft: 15,
  paddingRight: 15,
  fontFamily: 'regular89',
  fontWeight: "700",
  paddingBottom: windowWidth * 0.01,
  fontSize: 15,  
},
visitContainer: {
  marginTop: 20,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  padding: 10,
},
visitHeader: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
},
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: windowWidth*-0.5,
        
    },
    scrollContent: {
        flexGrow: 1,
    },
    text45:{
      marginTop: windowWidth*0.10,
      fontSize:18,
      fontFamily: 'bold01',
      marginLeft: 20,
  },
    textContainer:{
      backgroundColor: '#F1F4F3',
    padding: 5,
    borderRadius: windowWidth*0.01,
    },
    registerTextContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    registerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileContainer1: {
        alignItems: 'center',
        marginTop: 20,
        borderRadius: windowWidth*0.01,
        marginRight:windowWidth*0.3,
    },
    profileImage: {
        width: windowWidth*0.3,
        height: windowWidth*0.3,
        resizeMode: 'cover',
        borderRadius: 75,
        marginLeft: windowWidth*0.3
    },
    profileText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: windowWidth*0.34
    },
    detailsContainer: {
        marginTop: 20,
        paddingHorizontal: windowWidth*0.025,
        borderRadius: windowWidth*0.01,
        marginLeft:windowWidth*0.01
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        padding: 5,
    },
    value: {
        fontSize: 16,
       padding:windowWidth*0.01
    },
    buttonContainer: {

        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 20, 
        marginTop: 'auto', 
    },
    button: {
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: '45%',
    },
    deleteButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'red',
    },
    deleteText: {
        color: 'red',
    },
    updateButton: {
        backgroundColor: '#008080',
    },
    updateText: {
        color: '#FFFFFF',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
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
    callButton:{
      marginLeft:windowWidth*0.25,
      backgroundColor: '#9F0606',
      alignItems:'center',
      justifyContent:'center',
  },
  submitText: {
      color: '#FFFFFF',
  },
  cancelButton: {
    marginLeft:windowWidth*0.27,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'red',
    marginTop:windowWidth*0.05,
    marginBottom:windowWidth*0.02,
},
cancelText: {
    color: 'red',
},


});

export default NotificationDetails;
