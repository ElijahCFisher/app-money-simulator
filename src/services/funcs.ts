import { SourceSettingsRowComponent } from "src/app/source-settings-row/source-settings-row.component";
import { SourceComponent } from "src/app/source/source.component";

export class Funcs {

  constructor(){}

  static sourceFromJson(json: {[name: string]: any}, which: number = 0): SourceComponent {
    console.log(json)
    var ret: SourceComponent = new SourceComponent()
    ret.name = json["name"]
    ret.id = json["id"]

    // looping through each row depending on which scenario it is
    for(var row of (which ? (which == 1 ? json["rows1"] : json["rows2"]) : json["rows"])) {
      var rowComp: SourceSettingsRowComponent = new SourceSettingsRowComponent()
      if (Array.isArray(row)) {
        rowComp.attributes = {}
        for (var attribute of row)
          rowComp.attributes[attribute[0]] = attribute[1]
      }
      else
        rowComp.source = this.sourceFromJson(row)
      ret.rows.push(rowComp)
    }
    return ret;
  }

  static jsonFromSource(source: SourceComponent, which: number = 0): {[name: string]: any} {
    var ret: {[name: string]: any} = {
      "name": source.name,
      "id": source.id,
      [which ? (which == 1 ? "rows1" : "rows2") : "rows"]: []
    }

    // looping through each row depending on which scenario it is
    for(var row of source.rows) {
      var rowJson: string[][] = []
      var nextSource: {[name: string]: any} = {}
      if (!row.source)
        for (var attribute of row.attrsAsArray())
          rowJson.push([attribute[0], attribute[1]])
      else
        nextSource = this.jsonFromSource(row.source)
      ret[which ? (which == 1 ? "rows1" : "rows2") : "rows"].push((rowJson.length == 0 ? nextSource : rowJson))
    }
    return ret
  }
}
