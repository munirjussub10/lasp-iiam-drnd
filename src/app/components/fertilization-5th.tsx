import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Lightbulb, Sprout, Droplets, Scale, Beaker } from 'lucide-react';
import { Separator } from './ui/separator';
import type { SoilAnalysisData } from './soil-analysis-form';

interface FertilizationRecommendationProps {
  data: SoilAnalysisData;
}

export function Fertilization5th({ data }: FertilizationRecommendationProps) {
  // Cálculos baseados na 5ª Aproximação (Ribeiro et al., 1999)
  
  const calculateLimingNeed = (): number => {
    const hPlusAl = parseFloat(data.hPlusAl) || 0;
    const targetV = getCultureTargetV();
    const currentV = parseFloat(data.basesSaturation) || 0;
    const ctcT = parseFloat(data.ctc) + hPlusAl;

    // NC (t/ha) = [(V2 - V1) / 100] × t × f
    // onde t = CTC a pH 7,0 e f = 100/PRNT (assumindo PRNT = 100%)
    const nc = ((targetV - currentV) / 100) * ctcT;
    return Math.max(0, nc);
  };

  const getCultureTargetV = (): number => {
    const vTargets: { [key: string]: number } = {
      milho: 60,
      soja: 60,
      cafe: 60,
      cana: 60,
      feijao: 60,
      trigo: 60,
      algodao: 70,
      arroz: 50,
      pastagem: 50,
      horticultura: 70,
      eucalipto: 50,
      citros: 60,
    };
    return vTargets[data.culture] || 60;
  };

  const calculatePhosphorusFertilization = (): { dose: string; notes: string } => {
    const p = parseFloat(data.phosphorus) || 0;
    const prem = parseFloat(data.remainingPhosphorus) || 30;
    const culture = data.culture;

    // Classes de disponibilidade baseadas em P-rem
    let pClass = 'Media';
    if (prem < 20) pClass = 'Muito Argiloso';
    else if (prem < 40) pClass = 'Argiloso';
    else if (prem < 60) pClass = 'Textura Media';
    else pClass = 'Arenoso';

    let dose = '';
    let notes = '';

    // Recomendações para culturas anuais (grãos)
    if (['milho', 'soja', 'feijao', 'trigo', 'algodao'].includes(culture)) {
      if (p < 4) {
        dose = prem < 20 ? '100-120 kg/ha de P₂O₅' : '120-150 kg/ha de P₂O₅';
        notes = 'Nível muito baixo: aplicar dose total no plantio ou 2/3 no plantio + 1/3 em cobertura';
      } else if (p < 8) {
        dose = prem < 20 ? '80-100 kg/ha de P₂O₅' : '100-120 kg/ha de P₂O₅';
        notes = 'Nível baixo: aplicar no sulco de plantio';
      } else if (p < 12) {
        dose = '60-80 kg/ha de P₂O₅';
        notes = 'Nível médio: aplicar no sulco de plantio';
      } else if (p < 20) {
        dose = '40-60 kg/ha de P₂O₅';
        notes = 'Nível bom: adubação de manutenção';
      } else {
        dose = '30-40 kg/ha de P₂O₅';
        notes = 'Nível muito bom: apenas reposição';
      }
    } else if (culture === 'cafe') {
      if (p < 6) {
        dose = '200-300 g/cova de P₂O₅ no plantio + 50-100 g/planta/ano';
        notes = 'Formação: dose elevada. Produção: parcelar em 4 aplicações';
      } else if (p < 12) {
        dose = '50-80 g/planta/ano de P₂O₅';
        notes = 'Aplicar em 3-4 parcelas durante o ano';
      } else {
        dose = '30-50 g/planta/ano de P₂O₅';
        notes = 'Adubação de manutenção parcelada';
      }
    } else if (culture === 'cana') {
      if (p < 8) {
        dose = '100-140 kg/ha de P₂O₅';
        notes = 'Cana-planta: aplicar no sulco de plantio';
      } else if (p < 15) {
        dose = '60-100 kg/ha de P₂O₅';
        notes = 'Cana-planta: aplicar no sulco de plantio';
      } else {
        dose = '40-60 kg/ha de P₂O₅';
        notes = 'Manutenção. Cana-soca: aplicação em área total';
      }
    }

    return { dose, notes };
  };

  const calculatePotassiumFertilization = (): { dose: string; notes: string } => {
    const k = parseFloat(data.potassium) || 0;
    const culture = data.culture;
    let dose = '';
    let notes = '';

    // Culturas anuais
    if (['milho', 'soja', 'feijao', 'trigo', 'algodao'].includes(culture)) {
      if (k < 40) {
        dose = '80-120 kg/ha de K₂O';
        notes = 'Nível muito baixo: 1/3 plantio + 2/3 cobertura';
      } else if (k < 70) {
        dose = '60-80 kg/ha de K₂O';
        notes = 'Nível baixo: parcelar plantio/cobertura';
      } else if (k < 120) {
        dose = '40-60 kg/ha de K₂O';
        notes = 'Nível médio: pode aplicar todo no plantio';
      } else if (k < 200) {
        dose = '30-40 kg/ha de K₂O';
        notes = 'Adubação de manutenção';
      } else {
        dose = '20-30 kg/ha de K₂O';
        notes = 'Apenas reposição';
      }
    } else if (culture === 'cafe') {
      if (k < 60) {
        dose = '150-250 g/planta/ano de K₂O';
        notes = 'Parcelar em 4 aplicações. Café é muito exigente em K';
      } else if (k < 120) {
        dose = '100-150 g/planta/ano de K₂O';
        notes = 'Parcelar em 3-4 aplicações';
      } else {
        dose = '60-100 g/planta/ano de K₂O';
        notes = 'Adubação de manutenção parcelada';
      }
    } else if (culture === 'cana') {
      if (k < 60) {
        dose = '120-160 kg/ha de K₂O';
        notes = 'Cana-planta: 50% plantio + 50% cobertura (4-5 meses)';
      } else if (k < 120) {
        dose = '80-120 kg/ha de K₂O';
        notes = 'Parcelar em 2 aplicações';
      } else {
        dose = '60-80 kg/ha de K₂O';
        notes = 'Pode aplicar dose total no plantio ou soqueira';
      }
    }

    return { dose, notes };
  };

  const calculateNitrogenFertilization = (): { dose: string; notes: string } => {
    const om = parseFloat(data.organicMatter) || 0;
    const culture = data.culture;
    let dose = '';
    let notes = '';

    switch (culture) {
      case 'milho':
        dose = om < 2.5 ? '100-130 kg/ha de N' : '80-100 kg/ha de N';
        notes = '20-30% no plantio + restante em 2 coberturas (V4-V6 e V8-V10)';
        break;
      case 'soja':
        dose = 'Inoculação + 10-20 kg/ha de N';
        notes = 'Usar inoculante com Bradyrhizobium. N apenas como starter';
        break;
      case 'cafe':
        dose = '200-400 g/planta/ano de N';
        notes = 'Parcelar em 4 aplicações (set, dez, jan, mar)';
        break;
      case 'cana':
        dose = '60-90 kg/ha (planta) ou 80-120 kg/ha (soca)';
        notes = 'Cana-planta: 1/3 plantio + 2/3 cobertura. Soca: todo em cobertura';
        break;
      case 'feijao':
        dose = '60-90 kg/ha de N';
        notes = '20% plantio + 40% aos 20 DAE + 40% aos 35 DAE';
        break;
      case 'algodao':
        dose = '80-120 kg/ha de N';
        notes = '30% plantio + 35% aos 30 DAE + 35% aos 50 DAE';
        break;
      default:
        dose = '60-100 kg/ha de N';
        notes = 'Parcelar conforme a cultura';
    }

    return { dose, notes };
  };

  const getMicronutrientRecommendations = (): Array<{ nutrient: string; dose: string; notes: string }> => {
    const recs: Array<{ nutrient: string; dose: string; notes: string }> = [];
    
    const b = parseFloat(data.boron) || 0;
    const cu = parseFloat(data.copper) || 0;
    const zn = parseFloat(data.zinc) || 0;
    const mn = parseFloat(data.manganese) || 0;

    if (b < 0.4) {
      recs.push({
        nutrient: 'Boro (B)',
        dose: '1-2 kg/ha de B',
        notes: 'Aplicar bórax ou ácido bórico. Importante para café, algodão, eucalipto',
      });
    }

    if (cu < 0.8) {
      recs.push({
        nutrient: 'Cobre (Cu)',
        dose: '2-4 kg/ha de Cu',
        notes: 'Aplicar sulfato de cobre. Importante para cereais e citros',
      });
    }

    if (zn < 1.2) {
      recs.push({
        nutrient: 'Zinco (Zn)',
        dose: '3-5 kg/ha de Zn',
        notes: 'Aplicar sulfato de zinco. Crítico para milho, café e citros',
      });
    }

    if (mn < 6) {
      recs.push({
        nutrient: 'Manganês (Mn)',
        dose: '3-6 kg/ha de Mn',
        notes: 'Aplicar sulfato de manganês. Importante para soja em solos com pH elevado',
      });
    }

    return recs;
  };

  const limingNeed = calculateLimingNeed();
  const phosphorus = calculatePhosphorusFertilization();
  const potassium = calculatePotassiumFertilization();
  const nitrogen = calculateNitrogenFertilization();
  const micronutrients = getMicronutrientRecommendations();
  const targetV = getCultureTargetV();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recomendações de Adubação e Calagem - 5ª Aproximação</CardTitle>
        <CardDescription>
          Baseado em Ribeiro et al. (1999) para {data.culture ? data.culture.charAt(0).toUpperCase() + data.culture.slice(1) : 'cultura não selecionada'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Calagem */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-emerald-500 text-white">
              <Scale className="size-5" />
            </div>
            <h3 className="font-semibold">Calagem</h3>
          </div>
          <div className="pl-11">
            {limingNeed > 0.3 ? (
              <Alert className="bg-amber-50 border-amber-200">
                <AlertDescription>
                  <p className="font-medium mb-2">
                    Necessidade de Calagem (NC): <span className="text-lg text-amber-700">{limingNeed.toFixed(2)} t/ha</span>
                  </p>
                  <p className="text-sm mb-2">
                    <strong>V% atual:</strong> {parseFloat(data.basesSaturation).toFixed(1)}% → 
                    <strong> V% desejado:</strong> {targetV}%
                  </p>
                  <Separator className="my-2" />
                  <p className="text-sm">
                    <strong>Modo de aplicação:</strong>
                  </p>
                  <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                    <li>Aplicar calcário dolomítico (PRNT ≥ 80%) a lanço em área total</li>
                    <li>Incorporar com grade na profundidade de 0-20 cm</li>
                    <li>Realizar 60-90 dias antes do plantio</li>
                    <li>Em caso de reaplicação, considerar metade da dose se V% {'>'} 40%</li>
                  </ul>
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="bg-green-50 border-green-200">
                <AlertDescription>
                  <p className="font-medium">Solo com saturação por bases adequada</p>
                  <p className="text-sm">V% = {parseFloat(data.basesSaturation).toFixed(1)}% (Meta: {targetV}%)</p>
                  <p className="text-sm mt-1">Não há necessidade de calagem. Realizar análise anual para monitoramento.</p>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Gessagem */}
        {parseFloat(data.calcium) < 0.5 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-md bg-slate-500 text-white">
                <Beaker className="size-5" />
              </div>
              <h3 className="font-semibold">Gessagem</h3>
            </div>
            <div className="pl-11">
              <Alert className="bg-blue-50 border-blue-200">
                <AlertDescription>
                  <p className="font-medium mb-2">Recomendada aplicação de gesso agrícola</p>
                  <p className="text-sm mb-2">
                    <strong>Dose:</strong> 1-2 t/ha de gesso agrícola
                  </p>
                  <p className="text-sm">
                    O gesso melhora o ambiente radicular em subsuperfície, fornece Ca e S, 
                    e reduz Al tóxico em profundidade. Aplicar junto ou após a calagem.
                  </p>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        )}

        {/* Nitrogênio */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-blue-500 text-white">
              <Sprout className="size-5" />
            </div>
            <h3 className="font-semibold">Adubação Nitrogenada (N)</h3>
          </div>
          <div className="pl-11">
            <Alert>
              <AlertDescription>
                <p className="font-medium mb-2">{nitrogen.dose}</p>
                <p className="text-sm">{nitrogen.notes}</p>
                <Separator className="my-2" />
                <p className="text-sm">
                  <strong>Fontes:</strong> Ureia (45% N), Sulfato de amônio (21% N), Nitrato de amônio (32% N)
                </p>
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Fósforo */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-orange-500 text-white">
              <Droplets className="size-5" />
            </div>
            <h3 className="font-semibold">Adubação Fosfatada (P)</h3>
          </div>
          <div className="pl-11">
            <Alert>
              <AlertDescription>
                <p className="font-medium mb-2">{phosphorus.dose}</p>
                <p className="text-sm mb-2">{phosphorus.notes}</p>
                <Separator className="my-2" />
                <p className="text-sm">
                  <strong>Fontes:</strong> Superfosfato simples (18% P₂O₅), Superfosfato triplo (41% P₂O₅), 
                  MAP (52% P₂O₅), DAP (45% P₂O₅), Termofosfatos
                </p>
                {parseFloat(data.remainingPhosphorus) > 0 && (
                  <p className="text-sm mt-1">
                    <strong>P-rem:</strong> {parseFloat(data.remainingPhosphorus).toFixed(1)} mg/L - 
                    Este valor indica a capacidade de adsorção de P do solo
                  </p>
                )}
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Potássio */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-purple-500 text-white">
              <Droplets className="size-5" />
            </div>
            <h3 className="font-semibold">Adubação Potássica (K)</h3>
          </div>
          <div className="pl-11">
            <Alert>
              <AlertDescription>
                <p className="font-medium mb-2">{potassium.dose}</p>
                <p className="text-sm mb-2">{potassium.notes}</p>
                <Separator className="my-2" />
                <p className="text-sm">
                  <strong>Fontes:</strong> Cloreto de potássio - KCl (60% K₂O), 
                  Sulfato de potássio (50% K₂O) para culturas sensíveis ao cloro
                </p>
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Micronutrientes */}
        {micronutrients.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-md bg-teal-500 text-white">
                <Beaker className="size-5" />
              </div>
              <h3 className="font-semibold">Micronutrientes</h3>
            </div>
            <div className="pl-11 space-y-2">
              {micronutrients.map((micro, index) => (
                <Alert key={index} className="bg-orange-50 border-orange-200">
                  <AlertDescription>
                    <p className="font-medium">{micro.nutrient}</p>
                    <p className="text-sm"><strong>Dose:</strong> {micro.dose}</p>
                    <p className="text-sm">{micro.notes}</p>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </div>
        )}

        {/* Recomendações Complementares */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-amber-500 text-white">
              <Lightbulb className="size-5" />
            </div>
            <h3 className="font-semibold">Observações Importantes</h3>
          </div>
          <div className="pl-11">
            <Alert className="bg-blue-50 border-blue-200">
              <AlertDescription className="space-y-2 text-sm">
                <p><strong>• Sistema de Plantio Direto (SPD):</strong> Reduzir doses de P e K em 20-30% após consolidação do sistema</p>
                <p><strong>• Adubação Foliar:</strong> Complementar para micronutrientes em situações de deficiência diagnosticada</p>
                <p><strong>• Análise de Solo:</strong> Realizar anualmente, sempre na mesma época e profundidade</p>
                <p><strong>• Fontes Alternativas:</strong> Considerar fosfatos naturais reativos em solos ácidos e para culturas perenes</p>
                <p><strong>• Matéria Orgânica:</strong> Incorporar resíduos culturais e considerar adubação verde para melhorar características físicas e químicas</p>
              </AlertDescription>
            </Alert>
          </div>
        </div>

        {/* Aviso Legal */}
        <Alert className="bg-slate-50 border-slate-300">
          <AlertDescription className="text-sm">
            <p className="font-medium mb-1">📋 Responsabilidade Técnica:</p>
            Estas recomendações são orientativas baseadas na 5ª Aproximação (Ribeiro et al., 1999). 
            Para um plano de adubação definitivo, considere: histórico da área, expectativa de produtividade, 
            análise foliar, sistema de cultivo e condições climáticas. Consulte um Engenheiro Agrônomo do LASP de Nampula
            .
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
