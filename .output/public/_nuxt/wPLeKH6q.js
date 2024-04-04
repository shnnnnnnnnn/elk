import e from"./CbViG2Xw.js";import t from"./DISxKEhY.js";import"./Dch3xQiY.js";import"./CbYhyuC0.js";const n=Object.freeze({displayName:"ASP.NET Razor",fileTypes:["razor","cshtml"],name:"razor",patterns:[{include:"#razor-control-structures"},{include:"text.html.basic"}],repository:{"addTagHelper-directive":{captures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.directive.addTagHelper"},3:{patterns:[{include:"#tagHelper-directive-argument"}]}},match:"(@)(addTagHelper)\\s+([^$]+)?",name:"meta.directive"},"attribute-directive":{begin:"(@)(attribute)\\b\\s+",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.directive.attribute"}},end:"(?<=\\])|$",name:"meta.directive",patterns:[{include:"source.cs#attribute-section"}]},"await-prefix":{match:"(await)\\s+",name:"keyword.other.await.cs"},"balanced-brackets-csharp":{begin:"(\\[)",beginCaptures:{1:{name:"punctuation.squarebracket.open.cs"}},end:"(\\])",endCaptures:{1:{name:"punctuation.squarebracket.close.cs"}},name:"razor.test.balanced.brackets",patterns:[{include:"source.cs"}]},"balanced-parenthesis-csharp":{begin:"(\\()",beginCaptures:{1:{name:"punctuation.parenthesis.open.cs"}},end:"(\\))",endCaptures:{1:{name:"punctuation.parenthesis.close.cs"}},name:"razor.test.balanced.parenthesis",patterns:[{include:"source.cs"}]},"catch-clause":{begin:"(?:^|(?<=}))\\s*(catch)\\b\\s*?(?=[\\n\\(\\{])",beginCaptures:{1:{name:"keyword.control.try.catch.cs"}},end:"(?<=})",name:"meta.statement.catch.razor",patterns:[{include:"#catch-condition"},{include:"source.cs#when-clause"},{include:"#csharp-code-block"},{include:"#razor-codeblock-body"}]},"catch-condition":{begin:"\\(",beginCaptures:{0:{name:"punctuation.parenthesis.open.cs"}},end:"\\)",endCaptures:{0:{name:"punctuation.parenthesis.close.cs"}},patterns:[{captures:{1:{patterns:[{include:"source.cs#type"}]},6:{name:"entity.name.variable.local.cs"}},match:`(?x)
(?<type-name>
(?:
(?:
(?:(?<identifier>@?[_[:alpha:]][_[:alnum:]]*)\\s*\\:\\:\\s*)?
(?<name-and-type-args>
\\g<identifier>\\s*
(?<type-args>\\s*<(?:[^<>]|\\g<type-args>)+>\\s*)?
)
(?:\\s*\\.\\s*\\g<name-and-type-args>)* |
(?<tuple>\\s*\\((?:[^\\(\\)]|\\g<tuple>)+\\))
)
(?:\\s*\\?\\s*)?
(?:\\s*\\[(?:\\s*,\\s*)*\\]\\s*)*
)
)\\s*
(?:(\\g<identifier>)\\b)?`}]},"code-directive":{begin:"(@)(code)((?=\\{)|\\s+)",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.directive.code"}},end:"(?<=})|\\s",patterns:[{include:"#directive-codeblock"}]},"csharp-code-block":{begin:"(\\{)",beginCaptures:{1:{name:"punctuation.curlybrace.open.cs"}},end:"(\\})",endCaptures:{1:{name:"punctuation.curlybrace.close.cs"}},name:"meta.structure.razor.csharp.codeblock",patterns:[{include:"#razor-codeblock-body"}]},"csharp-condition":{begin:"(\\()",beginCaptures:{1:{name:"punctuation.parenthesis.open.cs"}},end:"(\\))",endCaptures:{1:{name:"punctuation.parenthesis.close.cs"}},patterns:[{include:"source.cs#local-variable-declaration"},{include:"source.cs#expression"},{include:"source.cs#punctuation-comma"},{include:"source.cs#punctuation-semicolon"}]},"directive-codeblock":{begin:"(\\{)",beginCaptures:{1:{name:"keyword.control.razor.directive.codeblock.open"}},contentName:"source.cs",end:"(\\})",endCaptures:{1:{name:"keyword.control.razor.directive.codeblock.close"}},name:"meta.structure.razor.directive.codeblock",patterns:[{include:"source.cs#class-or-struct-members"}]},"directive-markupblock":{begin:"(\\{)",beginCaptures:{1:{name:"keyword.control.razor.directive.codeblock.open"}},end:"(\\})",endCaptures:{1:{name:"keyword.control.razor.directive.codeblock.close"}},name:"meta.structure.razor.directive.markblock",patterns:[{include:"$self"}]},directives:{patterns:[{include:"#code-directive"},{include:"#functions-directive"},{include:"#page-directive"},{include:"#addTagHelper-directive"},{include:"#removeTagHelper-directive"},{include:"#tagHelperPrefix-directive"},{include:"#model-directive"},{include:"#inherits-directive"},{include:"#implements-directive"},{include:"#namespace-directive"},{include:"#inject-directive"},{include:"#attribute-directive"},{include:"#section-directive"},{include:"#layout-directive"},{include:"#using-directive"},{include:"#rendermode-directive"},{include:"#preservewhitespace-directive"},{include:"#typeparam-directive"}]},"do-statement":{begin:"(?:(@))(do)\\b\\s",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.loop.do.cs"}},end:"(?<=})",name:"meta.statement.do.razor",patterns:[{include:"#csharp-condition"},{include:"#csharp-code-block"},{include:"#razor-codeblock-body"}]},"do-statement-with-optional-transition":{begin:"(?:^\\s*|(@))(do)\\b\\s",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.loop.do.cs"}},end:"(?<=})",name:"meta.statement.do.razor",patterns:[{include:"#csharp-condition"},{include:"#csharp-code-block"},{include:"#razor-codeblock-body"}]},"else-part":{begin:"(?:^|(?<=}))\\s*(else)\\b\\s*?(?: (if))?\\s*?(?=[\\n\\(\\{])",beginCaptures:{1:{name:"keyword.control.conditional.else.cs"},2:{name:"keyword.control.conditional.if.cs"}},end:"(?<=})",name:"meta.statement.else.razor",patterns:[{include:"#csharp-condition"},{include:"#csharp-code-block"},{include:"#razor-codeblock-body"}]},"escaped-transition":{match:"@@",name:"constant.character.escape.razor.transition"},"explicit-razor-expression":{begin:"(@)\\(",beginCaptures:{0:{name:"keyword.control.cshtml"},1:{patterns:[{include:"#transition"}]}},end:"\\)",endCaptures:{0:{name:"keyword.control.cshtml"}},name:"meta.expression.explicit.cshtml",patterns:[{include:"source.cs#expression"}]},"finally-clause":{begin:"(?:^|(?<=}))\\s*(finally)\\b\\s*?(?=[\\n\\{])",beginCaptures:{1:{name:"keyword.control.try.finally.cs"}},end:"(?<=})",name:"meta.statement.finally.razor",patterns:[{include:"#csharp-code-block"},{include:"#razor-codeblock-body"}]},"for-statement":{begin:"(?:(@))(for)\\b\\s*(?=\\()",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.loop.for.cs"}},end:"(?<=})",name:"meta.statement.for.razor",patterns:[{include:"#csharp-condition"},{include:"#csharp-code-block"},{include:"#razor-codeblock-body"}]},"for-statement-with-optional-transition":{begin:"(?:^\\s*|(@))(for)\\b\\s*(?=\\()",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.loop.for.cs"}},end:"(?<=})",name:"meta.statement.for.razor",patterns:[{include:"#csharp-condition"},{include:"#csharp-code-block"},{include:"#razor-codeblock-body"}]},"foreach-condition":{begin:"\\(",beginCaptures:{0:{name:"punctuation.parenthesis.open.cs"}},end:"\\)",endCaptures:{0:{name:"punctuation.parenthesis.close.cs"}},patterns:[{captures:{1:{name:"keyword.other.var.cs"},2:{patterns:[{include:"source.cs#type"}]},7:{name:"entity.name.variable.local.cs"},8:{name:"keyword.control.loop.in.cs"}},match:`(?x)
(?:
(\\bvar\\b)|
(?<type-name>
(?:
(?:
(?:(?<identifier>@?[_[:alpha:]][_[:alnum:]]*)\\s*\\:\\:\\s*)?
(?<name-and-type-args>
\\g<identifier>\\s*
(?<type-args>\\s*<(?:[^<>]|\\g<type-args>)+>\\s*)?
)
(?:\\s*\\.\\s*\\g<name-and-type-args>)* |
(?<tuple>\\s*\\((?:[^\\(\\)]|\\g<tuple>)+\\))
)
(?:\\s*\\?\\s*)?
(?:\\s*\\[(?:\\s*,\\s*)*\\]\\s*)*
)
)
)\\s+
(\\g<identifier>)\\s+
\\b(in)\\b`},{captures:{1:{name:"keyword.other.var.cs"},2:{patterns:[{include:"source.cs#tuple-declaration-deconstruction-element-list"}]},3:{name:"keyword.control.loop.in.cs"}},match:`(?x)
(?:\\b(var)\\b\\s*)?
(?<tuple>\\((?:[^\\(\\)]|\\g<tuple>)+\\))\\s+
\\b(in)\\b`},{include:"source.cs#expression"}]},"foreach-statement":{begin:"(?:(@)(await\\s+)?)(foreach)\\b\\s*(?=\\()",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{patterns:[{include:"#await-prefix"}]},3:{name:"keyword.control.loop.foreach.cs"}},end:"(?<=})",name:"meta.statement.foreach.razor",patterns:[{include:"#foreach-condition"},{include:"#csharp-code-block"},{include:"#razor-codeblock-body"}]},"foreach-statement-with-optional-transition":{begin:"(?:^\\s*|(@)(await\\s+)?)(foreach)\\b\\s*(?=\\()",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{patterns:[{include:"#await-prefix"}]},3:{name:"keyword.control.loop.foreach.cs"}},end:"(?<=})",name:"meta.statement.foreach.razor",patterns:[{include:"#foreach-condition"},{include:"#csharp-code-block"},{include:"#razor-codeblock-body"}]},"functions-directive":{begin:"(@)(functions)((?=\\{)|\\s+)",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.directive.functions"}},end:"(?<=})|\\s",patterns:[{include:"#directive-codeblock"}]},"if-statement":{begin:"(?:(@))(if)\\b\\s*(?=\\()",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.conditional.if.cs"}},end:"(?<=})",name:"meta.statement.if.razor",patterns:[{include:"#csharp-condition"},{include:"#csharp-code-block"},{include:"#razor-codeblock-body"}]},"if-statement-with-optional-transition":{begin:"(?:^\\s*|(@))(if)\\b\\s*(?=\\()",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.conditional.if.cs"}},end:"(?<=})",name:"meta.statement.if.razor",patterns:[{include:"#csharp-condition"},{include:"#csharp-code-block"},{include:"#razor-codeblock-body"}]},"implements-directive":{captures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.directive.implements"},3:{patterns:[{include:"source.cs#type"}]}},match:"(@)(implements)\\s+([^$]+)?",name:"meta.directive"},"implicit-expression":{begin:"(?<![[:alpha:][:alnum:]])(@)",beginCaptures:{1:{patterns:[{include:"#transition"}]}},contentName:"source.cs",end:`(?=[\\s<>\\{\\}\\)\\]'"])`,name:"meta.expression.implicit.cshtml",patterns:[{include:"#await-prefix"},{include:"#implicit-expression-body"}]},"implicit-expression-accessor":{match:"(?<=\\.)[_[:alpha:]][_[:alnum:]]*",name:"variable.other.object.property.cs"},"implicit-expression-accessor-start":{begin:"([_[:alpha:]][_[:alnum:]]*)",beginCaptures:{1:{name:"variable.other.object.cs"}},end:`(?=[\\s<>\\{\\}\\)\\]'"])`,patterns:[{include:"#implicit-expression-continuation"}]},"implicit-expression-body":{end:`(?=[\\s<>\\{\\}\\)\\]'"])`,patterns:[{include:"#implicit-expression-invocation-start"},{include:"#implicit-expression-accessor-start"}]},"implicit-expression-continuation":{end:`(?=[\\s<>\\{\\}\\)\\]'"])`,patterns:[{include:"#balanced-parenthesis-csharp"},{include:"#balanced-brackets-csharp"},{include:"#implicit-expression-invocation"},{include:"#implicit-expression-accessor"},{include:"#implicit-expression-extension"}]},"implicit-expression-dot-operator":{captures:{1:{name:"punctuation.accessor.cs"}},match:"(\\.)(?=[_[:alpha:]][_[:alnum:]]*)"},"implicit-expression-invocation":{match:"(?<=\\.)[_[:alpha:]][_[:alnum:]]*(?=\\()",name:"entity.name.function.cs"},"implicit-expression-invocation-start":{begin:"([_[:alpha:]][_[:alnum:]]*)(?=\\()",beginCaptures:{1:{name:"entity.name.function.cs"}},end:`(?=[\\s<>\\{\\}\\)\\]'"])`,patterns:[{include:"#implicit-expression-continuation"}]},"implicit-expression-null-conditional-operator":{captures:{1:{name:"keyword.operator.null-conditional.cs"}},match:"(\\?)(?=[.\\[])"},"implicit-expression-null-forgiveness-operator":{captures:{1:{name:"keyword.operator.logical.cs"}},match:"(\\!)(?=(?:\\.[_[:alpha:]][_[:alnum:]]*)|\\?|[\\[\\(])"},"implicit-expression-operator":{patterns:[{include:"#implicit-expression-dot-operator"},{include:"#implicit-expression-null-conditional-operator"},{include:"#implicit-expression-null-forgiveness-operator"}]},"inherits-directive":{captures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.directive.inherits"},3:{patterns:[{include:"source.cs#type"}]}},match:"(@)(inherits)\\s+([^$]+)?",name:"meta.directive"},"inject-directive":{captures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.directive.inject"},3:{patterns:[{include:"source.cs#type"}]},4:{name:"entity.name.variable.property.cs"}},match:"(@)(inject)\\s*([\\S\\s]+?)?\\s*([_[:alpha:]][_[:alnum:]]*)?\\s*(?=$)",name:"meta.directive"},"layout-directive":{captures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.directive.layout"},3:{patterns:[{include:"source.cs#type"}]}},match:"(@)(layout)\\s+([^$]+)?",name:"meta.directive"},"lock-statement":{begin:"(?:(@))(lock)\\b\\s*(?=\\()",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.other.lock.cs"}},end:"(?<=})",name:"meta.statement.lock.razor",patterns:[{include:"#csharp-condition"},{include:"#csharp-code-block"},{include:"#razor-codeblock-body"}]},"lock-statement-with-optional-transition":{begin:"(?:^\\s*|(@))(lock)\\b\\s*(?=\\()",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.other.lock.cs"}},end:"(?<=})",name:"meta.statement.lock.razor",patterns:[{include:"#csharp-condition"},{include:"#csharp-code-block"},{include:"#razor-codeblock-body"}]},"model-directive":{captures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.directive.model"},3:{patterns:[{include:"source.cs#type"}]}},match:"(@)(model)\\s+([^$]+)?",name:"meta.directive"},"namespace-directive":{captures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.directive.namespace"},3:{patterns:[{include:"#namespace-directive-argument"}]}},match:"(@)(namespace)\\s+([^\\s]+)?",name:"meta.directive"},"namespace-directive-argument":{captures:{1:{name:"entity.name.type.namespace.cs"},2:{name:"punctuation.accessor.cs"}},match:"([_[:alpha:]][_[:alnum:]]*)(\\.)?"},"non-void-tag":{begin:"(?=<(!)?([^/\\s>]+)(\\s|/?>))",end:"(</)(\\2)\\s*(>)|(/>)",endCaptures:{1:{name:"punctuation.definition.tag.begin.html"},2:{name:"entity.name.tag.html"},3:{name:"punctuation.definition.tag.end.html"},4:{name:"punctuation.definition.tag.end.html"}},patterns:[{begin:"(<)(!)?([^/\\s>]+)(?=\\s|/?>)",beginCaptures:{1:{name:"punctuation.definition.tag.begin.html"},2:{name:"constant.character.escape.razor.tagHelperOptOut"},3:{name:"entity.name.tag.html"}},end:"(?=/?>)",patterns:[{include:"#razor-control-structures"},{include:"text.html.basic#attribute"}]},{begin:">",beginCaptures:{0:{name:"punctuation.definition.tag.end.html"}},end:"(?=</)",patterns:[{include:"#wellformed-html"},{include:"$self"}]}]},"optionally-transitioned-csharp-control-structures":{patterns:[{include:"#using-statement-with-optional-transition"},{include:"#if-statement-with-optional-transition"},{include:"#else-part"},{include:"#foreach-statement-with-optional-transition"},{include:"#for-statement-with-optional-transition"},{include:"#while-statement"},{include:"#switch-statement-with-optional-transition"},{include:"#lock-statement-with-optional-transition"},{include:"#do-statement-with-optional-transition"},{include:"#try-statement-with-optional-transition"}]},"optionally-transitioned-razor-control-structures":{patterns:[{include:"#razor-comment"},{include:"#razor-codeblock"},{include:"#explicit-razor-expression"},{include:"#escaped-transition"},{include:"#directives"},{include:"#optionally-transitioned-csharp-control-structures"},{include:"#implicit-expression"}]},"page-directive":{captures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.directive.page"},3:{patterns:[{include:"source.cs#string-literal"}]}},match:"(@)(page)\\s+([^$]+)?",name:"meta.directive"},"preservewhitespace-directive":{captures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.directive.preservewhitespace"},3:{patterns:[{include:"source.cs#boolean-literal"}]}},match:"(@)(preservewhitespace)\\s+([^$]+)?",name:"meta.directive"},"razor-codeblock":{begin:"(@)(\\{)",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.directive.codeblock.open"}},contentName:"source.cs",end:"(\\})",endCaptures:{1:{name:"keyword.control.razor.directive.codeblock.close"}},name:"meta.structure.razor.codeblock",patterns:[{include:"#razor-codeblock-body"}]},"razor-codeblock-body":{patterns:[{include:"#text-tag"},{include:"#wellformed-html"},{include:"#razor-single-line-markup"},{include:"#optionally-transitioned-razor-control-structures"},{include:"source.cs"}]},"razor-comment":{begin:"(@)(\\*)",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.comment.star"}},contentName:"comment.block.razor",end:"(\\*)(@)",endCaptures:{1:{name:"keyword.control.razor.comment.star"},2:{patterns:[{include:"#transition"}]}},name:"meta.comment.razor"},"razor-control-structures":{patterns:[{include:"#razor-comment"},{include:"#razor-codeblock"},{include:"#explicit-razor-expression"},{include:"#escaped-transition"},{include:"#directives"},{include:"#transitioned-csharp-control-structures"},{include:"#implicit-expression"}]},"razor-single-line-markup":{captures:{1:{name:"keyword.control.razor.singleLineMarkup"},2:{patterns:[{include:"#razor-control-structures"},{include:"text.html.basic"}]}},match:"(\\@\\:)([^$]*)$"},"removeTagHelper-directive":{captures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.directive.removeTagHelper"},3:{patterns:[{include:"#tagHelper-directive-argument"}]}},match:"(@)(removeTagHelper)\\s+([^$]+)?",name:"meta.directive"},"rendermode-directive":{captures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.directive.rendermode"},3:{patterns:[{include:"source.cs#type"}]}},match:"(@)(rendermode)\\s+([^$]+)?",name:"meta.directive"},"section-directive":{begin:"(@)(section)\\b\\s+([_[:alpha:]][_[:alnum:]]*)?",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.directive.section"},3:{name:"variable.other.razor.directive.sectionName"}},end:"(?<=})",name:"meta.directive.block",patterns:[{include:"#directive-markupblock"}]},"switch-code-block":{begin:"(\\{)",beginCaptures:{1:{name:"punctuation.curlybrace.open.cs"}},end:"(\\})",endCaptures:{1:{name:"punctuation.curlybrace.close.cs"}},name:"meta.structure.razor.csharp.codeblock.switch",patterns:[{include:"source.cs#switch-label"},{include:"#razor-codeblock-body"}]},"switch-statement":{begin:"(?:(@))(switch)\\b\\s*(?=\\()",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.switch.cs"}},end:"(?<=})",name:"meta.statement.switch.razor",patterns:[{include:"#csharp-condition"},{include:"#switch-code-block"},{include:"#razor-codeblock-body"}]},"switch-statement-with-optional-transition":{begin:"(?:^\\s*|(@))(switch)\\b\\s*(?=\\()",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.switch.cs"}},end:"(?<=})",name:"meta.statement.switch.razor",patterns:[{include:"#csharp-condition"},{include:"#switch-code-block"},{include:"#razor-codeblock-body"}]},"tagHelper-directive-argument":{patterns:[{include:"source.cs#string-literal"},{include:"#unquoted-string-argument"}]},"tagHelperPrefix-directive":{captures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.directive.tagHelperPrefix"},3:{patterns:[{include:"#tagHelper-directive-argument"}]}},match:"(@)(tagHelperPrefix)\\s+([^$]+)?",name:"meta.directive"},"text-tag":{begin:"(<text\\s*>)",beginCaptures:{1:{name:"keyword.control.cshtml.transition.textTag.open"}},end:"(</text>)",endCaptures:{1:{name:"keyword.control.cshtml.transition.textTag.close"}},patterns:[{include:"#wellformed-html"},{include:"$self"}]},transition:{match:"@",name:"keyword.control.cshtml.transition"},"transitioned-csharp-control-structures":{patterns:[{include:"#using-statement"},{include:"#if-statement"},{include:"#else-part"},{include:"#foreach-statement"},{include:"#for-statement"},{include:"#while-statement"},{include:"#switch-statement"},{include:"#lock-statement"},{include:"#do-statement"},{include:"#try-statement"}]},"try-block":{begin:"(?:(@))(try)\\b\\s*",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.try.cs"}},end:"(?<=})",name:"meta.statement.try.razor",patterns:[{include:"#csharp-condition"},{include:"#csharp-code-block"},{include:"#razor-codeblock-body"}]},"try-block-with-optional-transition":{begin:"(?:^\\s*|(@))(try)\\b\\s*",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.try.cs"}},end:"(?<=})",name:"meta.statement.try.razor",patterns:[{include:"#csharp-condition"},{include:"#csharp-code-block"},{include:"#razor-codeblock-body"}]},"try-statement":{patterns:[{include:"#try-block"},{include:"#catch-clause"},{include:"#finally-clause"}]},"try-statement-with-optional-transition":{patterns:[{include:"#try-block-with-optional-transition"},{include:"#catch-clause"},{include:"#finally-clause"}]},"typeparam-directive":{captures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.razor.directive.typeparam"},3:{patterns:[{include:"source.cs#type"}]}},match:"(@)(typeparam)\\s+([^$]+)?",name:"meta.directive"},"unquoted-string-argument":{match:"[^$]+",name:"string.quoted.double.cs"},"using-alias-directive":{captures:{1:{name:"entity.name.type.alias.cs"},2:{name:"keyword.operator.assignment.cs"},3:{patterns:[{include:"source.cs#type"}]}},match:"([_[:alpha:]][_[:alnum:]]*)\\b\\s*(=)\\s*(.+)\\s*"},"using-directive":{captures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.other.using.cs"},3:{patterns:[{include:"#using-static-directive"},{include:"#using-alias-directive"},{include:"#using-standard-directive"}]},4:{name:"keyword.control.razor.optionalSemicolon"}},match:"(@)(using)\\b\\s+(?!\\(|\\s)(.+?)?(;)?$",name:"meta.directive"},"using-standard-directive":{captures:{1:{name:"entity.name.type.namespace.cs"}},match:"([_[:alpha:]][_[:alnum:]]*)\\s*"},"using-statement":{begin:"(?:(@))(using)\\b\\s*(?=\\()",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.other.using.cs"}},end:"(?<=})",name:"meta.statement.using.razor",patterns:[{include:"#csharp-condition"},{include:"#csharp-code-block"},{include:"#razor-codeblock-body"}]},"using-statement-with-optional-transition":{begin:"(?:^\\s*|(@))(using)\\b\\s*(?=\\()",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.other.using.cs"}},end:"(?<=})",name:"meta.statement.using.razor",patterns:[{include:"#csharp-condition"},{include:"#csharp-code-block"},{include:"#razor-codeblock-body"}]},"using-static-directive":{captures:{1:{name:"keyword.other.static.cs"},2:{patterns:[{include:"source.cs#type"}]}},match:"(static)\\b\\s+(.+)"},"void-tag":{begin:"(?i)(<)(!)?(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)(?=\\s|/?>)",beginCaptures:{1:{name:"punctuation.definition.tag.begin.html"},2:{name:"constant.character.escape.razor.tagHelperOptOut"},3:{name:"entity.name.tag.html"}},end:"/?>",endCaptures:{0:{name:"punctuation.definition.tag.end.html"}},name:"meta.tag.structure.$3.void.html",patterns:[{include:"text.html.basic#attribute"}]},"wellformed-html":{patterns:[{include:"#void-tag"},{include:"#non-void-tag"}]},"while-statement":{begin:"(?:(@)|^\\s*|(?<=})\\s*)(while)\\b\\s*(?=\\()",beginCaptures:{1:{patterns:[{include:"#transition"}]},2:{name:"keyword.control.loop.while.cs"}},end:"(?<=})|(;)",endCaptures:{1:{name:"punctuation.terminator.statement.cs"}},name:"meta.statement.while.razor",patterns:[{include:"#csharp-condition"},{include:"#csharp-code-block"},{include:"#razor-codeblock-body"}]}},scopeName:"text.aspnetcorerazor",embeddedLangs:["html","csharp"]});var o=[...e,...t,n];export{o as default};
