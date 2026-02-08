import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export interface SoilAnalysisData {
  culture: string;
  depth: string;
  ph: string;
  organicMatter: string;
  phosphorus: string;
  potassium: string;
  calcium: string;
  magnesium: string;
  aluminum: string;
  hPlusAl: string;
  ctc: string;
  basesSaturation: string;
  sulfur: string;
  boron: string;
  copper: string;
  iron: string;
  manganese: string;
  zinc: string;
  soilTexture: string;
  remainingPhosphorus: string;
}

interface SoilAnalysisFormProps {
  data: SoilAnalysisData;
  onChange: (data: SoilAnalysisData) => void;
}

export function SoilAnalysisForm({ data, onChange }: SoilAnalysisFormProps) {
  const handleChange = (field: keyof SoilAnalysisData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Análise de Solo - 5ª Aproximação</CardTitle>
        <CardDescription>
          Insira os resultados da análise química do solo (baseado em Ribeiro et al., 1999)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Informações Gerais */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Informações Gerais</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="culture">Cultura</Label>
              <Select value={data.culture} onValueChange={(value) => handleChange('culture', value)}>
                <SelectTrigger id="culture">
                  <SelectValue placeholder="Selecione a cultura" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="milho">Milho</SelectItem>
                  <SelectItem value="soja">Soja</SelectItem>
                  <SelectItem value="cafe">Café</SelectItem>
                  <SelectItem value="cana">Cana-de-açúcar</SelectItem>
                  <SelectItem value="feijao">Feijão</SelectItem>
                  <SelectItem value="trigo">Trigo</SelectItem>
                  <SelectItem value="algodao">Algodão</SelectItem>
                  <SelectItem value="arroz">Arroz</SelectItem>
                  <SelectItem value="pastagem">Pastagem</SelectItem>
                  <SelectItem value="horticultura">Horticultura</SelectItem>
                  <SelectItem value="eucalipto">Eucalipto</SelectItem>
                  <SelectItem value="citros">Citros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="depth">Profundidade (cm)</Label>
              <Select value={data.depth} onValueChange={(value) => handleChange('depth', value)}>
                <SelectTrigger id="depth">
                  <SelectValue placeholder="Selecione a profundidade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-20">0-20 cm</SelectItem>
                  <SelectItem value="20-40">20-40 cm</SelectItem>
                  <SelectItem value="0-40">0-40 cm</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="soilTexture">Textura do Solo</Label>
              <Select value={data.soilTexture} onValueChange={(value) => handleChange('soilTexture', value)}>
                <SelectTrigger id="soilTexture">
                  <SelectValue placeholder="Selecione a textura" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arenosa">Arenosa (&gt;70% areia)</SelectItem>
                  <SelectItem value="media">Média (15-35% argila)</SelectItem>
                  <SelectItem value="argilosa">Argilosa (35-60% argila)</SelectItem>
                  <SelectItem value="muito-argilosa">Muito Argilosa (&gt;60% argila)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Macronutrientes Primários */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Macronutrientes Primários e Acidez</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ph">pH em Água</Label>
              <Input
                id="ph"
                type="number"
                step="0.1"
                placeholder="Ex: 6.0"
                value={data.ph}
                onChange={(e) => handleChange('ph', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organicMatter">Matéria Orgânica (dag/kg)</Label>
              <Input
                id="organicMatter"
                type="number"
                step="0.1"
                placeholder="Ex: 2.5"
                value={data.organicMatter}
                onChange={(e) => handleChange('organicMatter', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phosphorus">Fósforo - P (mg/dm³)</Label>
              <Input
                id="phosphorus"
                type="number"
                step="0.1"
                placeholder="Ex: 15"
                value={data.phosphorus}
                onChange={(e) => handleChange('phosphorus', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="potassium">Potássio - K (mg/dm³)</Label>
              <Input
                id="potassium"
                type="number"
                step="0.1"
                placeholder="Ex: 100"
                value={data.potassium}
                onChange={(e) => handleChange('potassium', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="remainingPhosphorus">P-rem (mg/L)</Label>
              <Input
                id="remainingPhosphorus"
                type="number"
                step="0.1"
                placeholder="Ex: 20"
                value={data.remainingPhosphorus}
                onChange={(e) => handleChange('remainingPhosphorus', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sulfur">Enxofre - S (mg/dm³)</Label>
              <Input
                id="sulfur"
                type="number"
                step="0.1"
                placeholder="Ex: 10"
                value={data.sulfur}
                onChange={(e) => handleChange('sulfur', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Macronutrientes Secundários */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Macronutrientes Secundários</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calcium">Cálcio - Ca (cmolc/dm³)</Label>
              <Input
                id="calcium"
                type="number"
                step="0.1"
                placeholder="Ex: 3.0"
                value={data.calcium}
                onChange={(e) => handleChange('calcium', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="magnesium">Magnésio - Mg (cmolc/dm³)</Label>
              <Input
                id="magnesium"
                type="number"
                step="0.1"
                placeholder="Ex: 1.0"
                value={data.magnesium}
                onChange={(e) => handleChange('magnesium', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aluminum">Alumínio - Al (cmolc/dm³)</Label>
              <Input
                id="aluminum"
                type="number"
                step="0.1"
                placeholder="Ex: 0.2"
                value={data.aluminum}
                onChange={(e) => handleChange('aluminum', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Complexo Sortivo */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Complexo Sortivo</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hPlusAl">H + Al (cmolc/dm³)</Label>
              <Input
                id="hPlusAl"
                type="number"
                step="0.1"
                placeholder="Ex: 4.0"
                value={data.hPlusAl}
                onChange={(e) => handleChange('hPlusAl', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ctc">CTC efetiva (cmolc/dm³)</Label>
              <Input
                id="ctc"
                type="number"
                step="0.1"
                placeholder="Ex: 8.25"
                value={data.ctc}
                onChange={(e) => handleChange('ctc', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="basesSaturation">Saturação por Bases - V (%)</Label>
              <Input
                id="basesSaturation"
                type="number"
                step="0.1"
                placeholder="Ex: 50"
                value={data.basesSaturation}
                onChange={(e) => handleChange('basesSaturation', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Micronutrientes */}
        <div>
          <h3 className="font-semibold mb-3 text-lg">Micronutrientes</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label htmlFor="boron">Boro - B (mg/dm³)</Label>
              <Input
                id="boron"
                type="number"
                step="0.01"
                placeholder="Ex: 0.5"
                value={data.boron}
                onChange={(e) => handleChange('boron', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="copper">Cobre - Cu (mg/dm³)</Label>
              <Input
                id="copper"
                type="number"
                step="0.1"
                placeholder="Ex: 1.5"
                value={data.copper}
                onChange={(e) => handleChange('copper', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="iron">Ferro - Fe (mg/dm³)</Label>
              <Input
                id="iron"
                type="number"
                step="0.1"
                placeholder="Ex: 50"
                value={data.iron}
                onChange={(e) => handleChange('iron', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="manganese">Manganês - Mn (mg/dm³)</Label>
              <Input
                id="manganese"
                type="number"
                step="0.1"
                placeholder="Ex: 10"
                value={data.manganese}
                onChange={(e) => handleChange('manganese', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zinc">Zinco - Zn (mg/dm³)</Label>
              <Input
                id="zinc"
                type="number"
                step="0.1"
                placeholder="Ex: 2.0"
                value={data.zinc}
                onChange={(e) => handleChange('zinc', e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}