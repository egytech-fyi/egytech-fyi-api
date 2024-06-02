export const appendQuery = (conditions: string[], param: string | string[] | undefined, column: string, map: Record<string, string>) => {
  if (param) {
    const params = Array.isArray(param) ? param : [param];
    const filters = params.map(p => map[p]).filter(Boolean);
    if (filters.length > 0) {
      conditions.push(`${column} IN (${filters.map(filter => `"${filter}"`).join(', ')})`);
    }
  }
};

export const appendYearsOfExperienceQuery = (conditions: string[], from: string | undefined, to: string | undefined) => {
  if (from) {
    const fromNumber = parseFloat(from);
    if (!isNaN(fromNumber)) {
      conditions.push(`Yoe >= ${fromNumber}`);
    }
  }
  if (to) {
    const toNumber = parseFloat(to);
    if (!isNaN(toNumber)) {
      conditions.push(`Yoe <= ${toNumber}`);
    }
  }
};

export const appendTechQuery = (conditions: string[], param: string | undefined, column: string, map: Record<string, string>) => {
  if (param) {
    const filter = map[param];
    if (filter) {
      conditions.push(`instr(${column}, "${filter}") > 0`);
    }
  }
};

export const appendWorkSettingsQuery = (conditions: string[], workSettings: string[]) => {
  conditions.push(`WorkSetting IN (${workSettings.map((setting) => `"${setting}"`).join(', ')})`);
};
